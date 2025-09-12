
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

def split_ids(ids):
    # this splits the input string ids into a list.
    return [value.strip() for value in ids.split(":") if value.strip()]

def fill_in_pattern_strings(algorithm):
    # input: algorithm name (NOT id)
    # output: filled in section of the pattern string part of the algorithm path to its csv file
    # idea: when running bagging, each algorithm only has one parameter, so fill them in to get the necessary path section
    alg = config["resources"]["structure_learning_algorithms"][algorithm][0] # this gets the dictionary of the SLA 
    ps = pattern_strings[algorithm]
    res_unformatted = ps.format(**alg)
    res = res_unformatted.replace("[","").replace("]","") # replace list brackets 

    return res

def fill_in_mcmc_strings(algorithm):
    # pattern_strings["mcmc_est"] = "mcmc_params/"\
    #                         "mcmc_estimator={mcmc_estimator}/"\
    #                         "threshold={threshold}/"\
    #                         "burnin_frac={burnin_frac}"
    # need to fill in the above parameters and return 
    alg = config["resources"]["structure_learning_algorithms"][algorithm][0]
    if isinstance(alg["mcmc_estimator"],list):
        mcmc_estimator = alg["mcmc_estimator"][0]
    else:
        mcmc_estimator = alg["mcmc_estimator"]

    if isinstance(alg["threshold"],list):
        threshold = str(alg["threshold"][0])
    else:
        threshold = str(alg["threshold"])

    if isinstance(alg["burnin_frac"],list):
        burnin_frac = str(alg["burnin_frac"][0])
    else:
        burnin_frac = str(alg["burnin_frac"])

    return ("mcmc_params/mcmc_estimator=" + mcmc_estimator + "/threshold=" + threshold + "/burnin_frac=" + burnin_frac)


def get_bagging_input(bmark_setup):
    result = []

    if "benchmarks" in bmark_setup["evaluation"] and bmark_setup["evaluation"]["benchmarks"]["ids"]: # if the ids list in the benchmarks section is not empty, we use those ids 
        ids = bmark_setup["evaluation"]["benchmarks"]["ids"]
    else:
        ids = bmark_setup["evaluation"]["graph_estimation"]["ids"] # just graph estimation will work too 

    for algid in ids:
        if algid != "bagging":
            algorithm = idtoalg(algid)[0] # get the algorithm name from its id

            filled = fill_in_pattern_strings(algorithm)

            # mcmc has different path 
            if "mcmc_estimator" in config["resources"]["structure_learning_algorithms"][algorithm][0]:
                filled_mcmc = fill_in_mcmc_strings(algorithm)
                # need to fill in bn and adjmat wildcards
                # result.append("{output_dir}/adjmat_estimate/adjmat=/{adjmat}/parameters=/{bn}/data=/{data}/algorithm=/" + filled + "/" + filled_mcmc + "/seed={seed}/adjmat.csv")
                result.append("{output_dir}/adjmat_estimate/{data}/algorithm=/" + filled + "/" + filled_mcmc + "/seed={seed}/adjmat.csv")
            else:
                result.append("{output_dir}/adjmat_estimate/{data}/algorithm=/" + filled + "/seed={seed}/adjmat.csv") # this is the path to the csv file with just the wildcards needed 

           
    return result

# The idea behind getting the input is the fact that all but the outputdir, data, and seed wildcards will be the same, so they are filled in beforehand.

rule:
    name:
        module_name
    input:
        csv_adjmats = get_bagging_input(bmark_setup), # for the particular seed, data, and outputdir, we get all the csv files as input
    output:
        adjmat=alg_output_adjmat_path(module_name), # the output is the new csv files as well as the required time and ntests files (handled in bagging.py)
        avgmat=alg_output_avgmat_path(module_name),
        time=alg_output_time_path(module_name),
        ntests=alg_output_ntests_path(module_name),
    params:
        configfile = config
    script:
        "bagging.py"