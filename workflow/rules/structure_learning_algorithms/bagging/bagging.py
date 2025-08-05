#!/usr/bin/env python3
sys.path.append("workflow/scripts/utils")
from add_timeout import *
import time
import os
import pandas as pd
import numpy as np
import sys




def idtoalg(run_id: str):
    """ Returns the algorithm name that the id belongs to, otherwise None """
    for key, alg in config["resources"]["structure_learning_algorithms"].items():
        for obj in alg:
            if obj["id"] == run_id:

                return key, obj
    return None, None


def split_ids(ids):
    # this splits the input string ids into a list.
    return [value.strip() for value in ids.split(":") if value.strip()]


def alg():
    adjs = snakemake.input # list of paths to the adjacency matrices

    out_csv_adj = snakemake.output["adjmat"]
    out_csv_avg = snakemake.output["avgmat"]

    # go through the input string and split the ids to make the corect list
    ids = split_ids(snakemake.wildcards["ids"])
    bcategory = snakemake.wildcards["category"]
    threshold = float(snakemake.wildcards["bagging_threshold"])

    # 1. Load all adjacency matrices into a list of DataFrames
    # mats = [pd.read_csv(path, index_col=0) for path in adjs]
    mats = [pd.read_csv(path, header=0).loc[:, lambda df: ~
                                            df.columns.str.contains('^Unnamed')] for path in adjs]

    if len(mats) == 0:
        print("ERROR: No adjacency matrices found, try adding some algorithms to the config file or check the input paths")
        exit(1)

    

    if bcategory == "standard":
        weights = [1/len(mats)]*len(mats)
    else:
        # make the weights dict:

        weights_dict = dict()

        # format will be alg,weight,alg,weight (always even length so skip by 2)
        for i in range(0, len(ids), 2):
            # must also convert the string number to float
            weights_dict[ids[i]] = float(ids[i+1])

        weights = []

        # convert id weights dictionary into name weights dictionary
        name_weight = dict()
        for key, value in weights_dict.items():
            name_weight[idtoalg(key)[0]] = value

        # get the weights in order of the input path csv files
        for path in adjs:
            parts = path.split('algorithm=/')
            if len(parts) > 1:
                name = parts[1].split('/')[0]
            weights.append(name_weight[name])

        # convert to numpy array and normalize the weights
    weights = np.array(weights)
    weights = weights / np.sum(weights)

    # Compute weighted average adjacency
    avg_df = sum(w * df for w, df in zip(weights, mats))

    # Threshold to binary edges
    bin_mat = (avg_df >= threshold).astype(int)

    # This is the time output
    tottime = time.perf_counter() - start
    with open(snakemake.output["time"], "w") as text_file:
        text_file.write(str(tottime))

    # These are the adjmat and avgmats
    pd.DataFrame(avg_df).to_csv(out_csv_avg, index=False)
    pd.DataFrame(bin_mat).to_csv(out_csv_adj, index=False)


    # ntests output (not applicable here)
    with open(snakemake.output["ntests"], "w") as text_file:
        text_file.write("None")


start = time.perf_counter()
alg()
