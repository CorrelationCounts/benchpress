library(R.utils)
library(huge)
source("workflow/scripts/utils/helpers.R")

# File paths and seed
output_filename <- file.path(snakemake@output[["adjmat"]])
data_filename <- snakemake@input[["data"]]
seed <- as.integer(snakemake@wildcards[["seed"]])

myalg <- function() {
    # Read in data
    data <- read.csv(data_filename, check.names = FALSE)
    start <- proc.time()[1]
    
    ## Set seed for reproducibility
    set.seed(seed)

    ## Handle lambda
    lambda <- NULL
    if (snakemake@wildcards[["lambda"]] != "None") {
        lambda <- as.numeric(snakemake@wildcards[["lambda"]])
    }

    ## Handle nlambda
    nlambda <- NULL
    if (snakemake@wildcards[["nlambda"]] != "None") {
        nlambda <- as.numeric(snakemake@wildcards[["nlambda"]])
    }

    ## Handle select criterion (default = ebic)
    select_criterion <- "ebic"
    if (snakemake@wildcards[["select_criterion"]] != "None") {
        select_criterion <- snakemake@wildcards[["select_criterion"]]
    }

    ## Estimation (glasso method)
    huge_result <- huge(as.matrix(data),
                        method = "glasso",
                        lambda = lambda,
                        nlambda = nlambda,
                        verbose = FALSE)

    ## Select the precision matrix
    out.select <- huge.select(huge_result,
                              criterion = select_criterion,
                              verbose = FALSE)

    ## Transform to an adjacency matrix (binary: edge or no edge)
    adjmat <- as.matrix(abs(as.matrix(out.select$opt.icov)) > 0)

    ## Fix column/row names (remove "X" prefixes)
    clean_names <- gsub("X", "", colnames(data))
    colnames(adjmat) <- clean_names
    rownames(adjmat) <- clean_names

    # Format and save the results
    totaltime <- proc.time()[1] - start
    write.csv(adjmat, file = output_filename, row.names = FALSE, quote = FALSE)
    write(totaltime, file = snakemake@output[["time"]])

    cat("None", file = snakemake@output[["ntests"]], sep = "\n") 
}

add_timeout(myalg)
