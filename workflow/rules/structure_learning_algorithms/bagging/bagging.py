#!/usr/bin/env python3
import numpy as np
import pandas as pd
import sys
import os


def idtoalg(run_id: str):
    """ Returns the algorithm name that the id belongs to, otherwise None """
    for key, alg in config["resources"]["structure_learning_algorithms"].items():
        for obj in alg:
            if obj["id"] == run_id:

                return key, obj
    return None, None


# Snakemake injects these for you:
adjs = snakemake.input
config = snakemake.params.configfile
bagging = config["resources"]["structure_learning_algorithms"]["bagging"][0]
out_csv_adj = snakemake.output["adjmat"]
out_csv_avg = snakemake.output["avgmat"]

ids = bagging["ids"]
bcategory = bagging["category"]

print(f"Running bagging for {ids} with type {bcategory}")


# 1. Load all adjacency matrices into a list of DataFrames
# mats = [pd.read_csv(path, index_col=0) for path in adjs]
mats = [pd.read_csv(path, header=0).loc[:, lambda df: ~
                                        df.columns.str.contains('^Unnamed')] for path in adjs]

if len(mats) == 0:
    print("ERROR: No adjacency matrices found, try adding some algorithms to the config file or check the input paths")
    exit(1)


if bcategory == "standard":
    weights = [1/len(mats)]*len(mats)
    threshold = 0.5
else:
    threshold = bagging["threshold"]
    weights_dict = bagging["weights"]

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

# Save back out
pd.DataFrame(avg_df).to_csv(out_csv_avg, index=False)
pd.DataFrame(bin_mat).to_csv(out_csv_adj, index=False)
