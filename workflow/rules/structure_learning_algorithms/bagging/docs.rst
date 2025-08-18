======================================================

The Bagging module in Benchpress is designed to enhance the performance and robustness of causal discovery algorithms by aggregating their predictions.
This ensemble technique helps reduce variance and leads to more stable and reliable causal graphs. Note that the module does not use bootstrapping like in traditional bagging algorithms. 
This version performs standard or weighted averages on a set of algorithms to produce the average adjacency matrix. The current version only supports undirected graphs, as averaging multiple algorithms can induce directed cycles.

Schema and Configuration:
======================================================
- The standard bagging method gives all algorithms equal weight in the final prediction.
- The threshold number dictates that if the proportion of votes for an edge exceeds this threshold, that edge is included in the final adjacency matrix. 
- You can change the threshold and use standard bagging at the same time.
- The weighted bagging method allows for custom weights to be assigned to each algorithm, which can be specified in the configuration.
- If no threshold is specified, it is assigned a default value of 0.5.

Implementation:
======================================================
- The format can be seen in the examples section, but the significant part is the "ids" field, which must be a string that has the ids (with weights after if using weighted bagging) in a format separated by colon ":" characters.

Notes:
======================================================

- The bagging module currently requires that each structure learning algorithms only produces one csv file, so Benchpress permits only one combination of the parameters for each algorithm.
- For the weighted bagging, the weights are normalized, so one can use ratios for weight selection, ex: if weights are (1,1,2), then the corresponding real values are then (0.25 0.25 0.5).
- The plots will show weights as written in the config file (not normalized).


