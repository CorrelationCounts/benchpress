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
    lambda <- 1
    if (snakemake@wildcards[["lambda"]] != "None") {
        lambda <- as.numeric(snakemake@wildcards[["lambda"]])
    }

    ## Handle nlambda safely
    nlambda <- NULL
    if ("nlambda" %in% names(snakemake@wildcards) &&
        snakemake@wildcards[["nlambda"]] != "None") {
        nlambda <- as.numeric(snakemake@wildcards[["nlambda"]])
    }

    ## Estimation (TIGER method)
    huge_result <- huge(as.matrix(data),
                        method = "tiger",
                        lambda = lambda,
                        nlambda = nlambda,
                        verbose = FALSE)

    ## Transform to an adjacency matrix
    adjmat <- as.matrix(huge_result$path[[1]])
    
    ## Fix column/row names (remove "X")
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
