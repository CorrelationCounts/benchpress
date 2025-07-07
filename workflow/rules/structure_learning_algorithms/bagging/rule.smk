
def alg_output_avgmat_path(algorithm):
    return "{output_dir}/adjmat_estimate/{data}/"\
        "algorithm=/" + pattern_strings[algorithm] + "/" +\
        "seed={seed}/" \
        "avgmat.csv"

def adjmats(bmark_setup, eval_method="graph_plots"):
    ret = [[[[expand("{output_dir}/adjmat_estimate/"
            "adjmat=/{adjmat_string}/"
                     "parameters=/{param_string}/"
                     "data=/{data_string}/"
                     "algorithm=/{alg_string}/"
                     "seed={seed}/"
                     "adjmat.csv",
                     output_dir="results",
                     alg_string=json_string[alg_conf["id"]],
                     **alg_conf,
                     seed=seed,
                     adjmat_string=gen_adjmat_string_from_conf(
                         sim_setup["graph_id"], seed),
                     param_string=gen_parameter_string_from_conf(
                         sim_setup["parameters_id"], seed),
                     data_string=gen_data_string_from_conf(sim_setup["data_id"], seed, seed_in_path=False))
              for seed in get_seed_range(sim_setup["seed_range"])]
             for sim_setup in bmark_setup["data"]]
            for alg_conf in config["resources"]["structure_learning_algorithms"][alg]
            if alg_conf["id"] in bmark_setup["evaluation"]["graph_estimation"]["ids"] and alg_conf["id"]!="bagging"]
           for alg in active_algorithms(bmark_setup, eval_method)]
    return ret



rule:
    name:
        module_name
    input:
        csv_adjmats = adjmats(bmark_setup,"graph_estimation"),
    output:
        adjmat=alg_output_adjmat_path(module_name),
        avgmat=alg_output_avgmat_path(module_name),
        time=alg_output_time_path(module_name),
        ntests=touch(alg_output_ntests_path(module_name))
    params:
        configfile = config
    script:
        "bagging.py"