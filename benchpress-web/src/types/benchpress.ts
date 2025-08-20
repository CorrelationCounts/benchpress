export interface BenchmarkSetup {
  title: string
  data: DataSetup[]
  evaluation: Evaluation
}

export interface DataSetup {
  graph_id: string
  parameters_id: string
  data_id: string
  seed_range: [number, number]
}

export interface Evaluation {
  benchmarks?: {
    filename_prefix: string
    show_seed: boolean
    errorbar: boolean
    errorbarh: boolean
    scatter: boolean
    path: boolean
    text: boolean
    ids: string[]
  }
  graph_true_plots?: boolean
  graph_true_stats?: boolean
  ggally_ggpairs?: boolean
  graph_estimation?: {
    ids: string[]
    convert_to: string[]
    graphs: boolean
    adjmats: boolean
    diffplots: boolean
    csvs: boolean
    graphvizcompare: boolean
  }
  mcmc_traj_plots?: string[]
  mcmc_heatmaps?: string[]
  mcmc_autocorr_plots?: string[]
}

export interface Resources {
  data: Record<string, DataResource[]>
  graph: Record<string, GraphResource[]>
  parameters: Record<string, ParameterResource[]>
  structure_learning_algorithms: Record<string, AlgorithmResource[]>
}

export interface DataResource {
  id: string
  standardized?: boolean
  n?: number | number[]
  method?: string
  sem_type?: string
  noise_scale?: number
}

export interface GraphResource {
  id: string
  max_parents?: number
  n?: number | number[]
  d?: number
  par1?: number | null
  par2?: number | null
  method?: string
  DAG?: boolean
  order?: number
  alpha?: number
  beta?: number
}

export interface ParameterResource {
  id: string
  min?: number
  max?: number
  rho?: number
  sigma2?: number
  b?: number
  threshold_conv?: number
}

export interface AlgorithmResource {
  id: string
  timeout?: number | null
  [key: string]: string | number | boolean | null | undefined | (string | number | boolean)[] // Allow additional algorithm-specific parameters
}

export interface BenchpressConfig {
  benchmark_setup: BenchmarkSetup[]
  resources: Resources
}

export interface RunResult {
  id: string
  config: BenchpressConfig
  status: 'running' | 'completed' | 'failed'
  startTime: Date
  endTime?: Date
  metrics?: RunMetrics
}

export interface RunMetrics {
  algorithms: string[]
  fpr: number[]
  tpr: number[]
  shd: number[]
  execution_time: number[]
  precision: number[]
  recall: number[]
  f1_score: number[]
}
