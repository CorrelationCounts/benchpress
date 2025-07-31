
def alg_output_avgmat_path(algorithm):
    return "{output_dir}/adjmat_estimate/{data}/"\
        "algorithm=/" + pattern_strings[algorithm] + "/" +\
        "seed={seed}/" \
        "avgmat.csv"

def idtoalg(run_id: str):
    """ Returns the algorithm name that the id belongs to, otherwise None """
    for key, alg in config["resources"]["structure_learning_algorithms"].items():
        for obj in alg:
            if obj["id"] == run_id:

                return key, obj
    return None, None
# look through all the ids and return list of this: 

# pattern strings looks like: alg/alg_params=/ dict_to_path (algorithm)
# dict_to_path looks like:     tmp = [key+"={"+key+"}" for key, val in c.items()] separated by '/'
def split_ids(ids):
    # this splits the input string ids into a list.
    return [value.strip() for value in ids.split(":") if value.strip()]


# pattern_strings[algorithm]
def fill_in_pattern_strings(algorithm):
    # idea: when running bagging, each algorithm only has one parameter, so fill them in early
    alg = config["resources"]["structure_learning_algorithms"][algorithm][0] # this gets the dictionary of the SLA 
    ps = pattern_strings[algorithm]
    res_unformatted = ps.format(**alg)
    res = res_unformatted.replace("[","").replace("]","") # replace list brackets 

    return res


def get_bagging_input(bmark_setup):
    result = []

    if "benchmarks" in bmark_setup["evaluation"] and bmark_setup["evaluation"]["benchmarks"]["ids"]: # if the ids list in the benchmarks section is not empty, we use those ids 
        ids = bmark_setup["evaluation"]["benchmarks"]["ids"]
    else:
        ids = bmark_setup["evaluation"]["graph_estimation"]["ids"]

    for algid in ids:
        if algid != "bagging":
            algorithm = idtoalg(algid)[0]

            filled = fill_in_pattern_strings(algorithm)

            result.append("{output_dir}/adjmat_estimate/{data}/algorithm=/" + filled + "/seed={seed}/adjmat.csv")

    return result

# The idea behind getting the input is the fact that all but outputdir data and seed wildcards will all be the same, so they are filled in beforehand. I am not sure how the nest 

rule:
    name:
        module_name
    input:
        csv_adjmats = get_bagging_input(bmark_setup),
    output:
        adjmat=alg_output_adjmat_path(module_name),
        avgmat=alg_output_avgmat_path(module_name),
        time=alg_output_time_path(module_name),
        ntests=alg_output_ntests_path(module_name),
    params:
        configfile = config
    script:
        "bagging.py"