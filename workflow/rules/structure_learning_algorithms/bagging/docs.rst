Bagging Module Documentation:
======================================================

The Bagging module in Benchpress is designed to enhance the performance and robustness of causal discovery algorithms by aggregating their predictions.
This ensemble technique helps reduce variance and leads to more stable and reliable causal graphs. Note that the module does not use bootstrapping like in traditional bagging algorithms. 
This version performs standard or weighted averages on a set of algorithms to produce the average adjacency matrix.

Schema and Configuration:
======================================================

Bagging is configured through the config.json file.
It is parsed and validated using schema.json, and executed through the bagging.py script, which is called by Snakemake in rule.smk.
The user can specify bagging in the configuration file as follows with one of three options:


Bagging is written as a structure learning algorithm. You can see examples of the formatting in the schema.json file. Generally the user will give the type of bagging and the ids used (weights if applicable), and that 
is all the necessary information. 

The standard bagging method gives all algorithms equal weight in the final prediction, with threshold set to 0.5 by default.
The threshold number dictates that if the proportion of votes for an edge exceeds this threshold, that edge is included in the final adjacency matrix. Note you can change the threshold and use standard bagging at the same time.
The weighted bagging method allows for custom weights to be assigned to each algorithm, which can be specified in the configuration.
The threshold can also be adjusted to control the inclusion of edges based on the proportion of votes.

Implementation:
======================================================

- **bagging.py**: Uses csv files created from the structure learning algorithms to create an averaged csv file.
- **rule.smk**: Runs the bagging rule to create the csv file, as well as other rules to create the adjacency matrix and graph PNG files.
- All output files are stored in the same format as other structure learning algorithms.
- The format can be seen in the examples section of the schema.json file, but the significant part is the "ids" field, which must be a string that has the ids (with weights after if using weighted bagging) 
in a format separated by colon ":" character. For example: "ids": "alg_one_id:alg_two_id:alg_three_id" for standard or "alg_one_id:0.3:alg_two_id:0.5:alg_three_id:0.2".

Notes:
======================================================

- The bagging module currently requires that all structure learning algorithms only produce one csv file, 
  i.e., only one parameter allowed.
- For the weighted bagging, the weights are normalized, so one can use ratios for weight selection, ex:
    if weights are (1,1,2), then the corresponding real values are then (0.25 0.25 0.5)
- The plots will show the parameters as implemented, so if you use 1,1,2 as the weights, it will work as intented but the plots will show these figures as the weights.
- At a future stage, there could be some way to average not just the end stage binary adjacency matrices, but the pre-binary matrices that different algorithms produce. This would likely lead to even more accurate results.  


