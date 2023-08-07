def adjmat_true_plots():
    return [[expand("{output_dir}/adjmat/{adjmat_string}.png",
            output_dir="results",
            seed=seed,
            adjmat_string=gen_adjmat_string_from_conf(sim_setup["graph_id"], seed))
            for seed in get_seed_range(sim_setup["seed_range"]) ]
            for sim_setup in config["benchmark_setup"]["data"] ]

def graph_true_plots():
    return [[expand("{output_dir}/graph_plot/{adjmat_string}.png",
            output_dir="results",
            seed=seed,
            adjmat_string=gen_adjmat_string_from_conf(sim_setup["graph_id"], seed))
            for seed in get_seed_range(sim_setup["seed_range"]) ]
            for sim_setup in config["benchmark_setup"]["data"] ]

# This rule is very generally specified and relies on that it is called in the right way.
# I.e with the path of an adjacency matrix.
rule true_adjmat_to_dot:
    input:
        "workflow/scripts/utils/adjmat_to_dot.py",
        filename="{output_dir}/adjmat/{something}.csv" # true graph has /adjmat/ in the path and estimated does not.
    output:        
        filename = "{output_dir}/dotgraph/{something}.dot"
    container:
        docker_image("trilearn")
    shell:
        """
        if [ -s {input.filename} ]; then
            python workflow/scripts/utils/adjmat_to_dot.py {input.filename} {output.filename}
        else
            touch {output.filename}
        fi
        """


rule graph_true_plots:
    input:
        conf=configfilename,
        graphs=graph_true_plots(),
        adjmats=adjmat_true_plots(),
        #cstrees=
    output:
        touch("results/output/graph_true_plots/graph_true_plots.done"),
    run:
        for i,f in enumerate(input.graphs):
            shell("cp "+f+" results/output/graph_true_plots/graph_true_" +str(i+1) +".png")
        for i,f in enumerate(input.adjmats):
            shell("cp "+f+" results/output/graph_true_plots/adjmat_true_" +str(i+1) +".png")

rule adjmat_true_plot:
    input:
        matrix_filename="{output_dir}/adjmat/{adjmat_string}.csv"
    output:
        plot_filename = "{output_dir}/adjmat/{adjmat_string}.png"
    params:
        title="{adjmat_string}.csv",
        alg_string=""
    container:
        docker_image("pydatascience")
    script:
        "plot_matrix_as_heatmap.py"