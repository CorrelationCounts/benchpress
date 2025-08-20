# Benchpress Web Interface

A modern web application built with Next.js and Tailwind CSS for interacting with the Benchpress structure learning benchmarking framework.

## Features

### 🎛️ Configuration Management
- **Visual Configuration Builder**: Create and edit Benchpress configurations through an intuitive web interface
- **Pre-built Templates**: Choose from existing configuration templates (minimal, Tetrad suite, GCastle algorithms)
- **JSON Preview & Export**: View and export configurations as JSON files
- **Form Validation**: Ensure configurations are valid before saving

### 📊 Run Management
- **Run Monitoring**: Track the status of running benchmarks in real-time
- **Progress Tracking**: Monitor execution progress with visual indicators
- **Run History**: View completed, failed, and queued benchmark runs
- **Run Control**: Start, pause, and stop benchmark executions

### 📈 Analytics Dashboard
- **Performance Metrics**: Compare algorithms using F1 score, precision, recall, and SHD
- **Execution Time Analysis**: Track and compare algorithm execution times
- **ROC Curves**: Visualize receiver operating characteristic curves for algorithm comparison
- **Interactive Charts**: Explore data with interactive scatter plots and line charts

### 🔧 API Integration
- **RESTful APIs**: Backend APIs for configuration and run management
- **Snakemake Integration**: Direct integration with Benchpress Snakemake workflows
- **Real-time Updates**: Live updates of benchmark execution status

## Project Structure

```
benchpress-web/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   ├── config/            # Configuration management pages
│   │   ├── runs/              # Run management pages
│   │   ├── dashboard/         # Analytics dashboard
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI components
│   │   ├── config/           # Configuration-related components
│   │   ├── analytics/        # Chart and analytics components
│   │   └── layout/           # Layout components
│   ├── lib/                   # Utility functions and API clients
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
└── package.json              # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A running Benchpress installation

### Installation

1. **Navigate to the web application directory:**
   ```bash
   cd benchpress-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

### Production Build

```bash
npm run build
npm start
```

## Usage

### Creating a Configuration

1. Navigate to **Configurations** in the sidebar
2. Click **"New Configuration"**
3. Fill in the benchmark setup details:
   - **Title**: Name for your benchmark
   - **Data Setup**: Configure data generation parameters
   - **Resources**: Define graph, parameters, and algorithm resources
4. Preview the JSON configuration
5. Save or export the configuration

### Running Benchmarks

1. Go to **Configurations** and select a saved configuration
2. Click **"Run Benchmark"** 
3. Monitor progress in the **Runs** section
4. View detailed results once completed

### Analyzing Results

1. Navigate to **Analytics Dashboard**
2. Choose from different analysis views:
   - **Overview**: High-level performance metrics
   - **Algorithm Comparison**: Compare algorithms across multiple dimensions
   - **Performance Metrics**: Detailed accuracy measurements
   - **ROC Analysis**: Receiver operating characteristic curves

## Configuration Schema

The web interface works with Benchpress configuration files that follow this structure:

```json
{
  "benchmark_setup": [
    {
      "title": "benchmark_name",
      "data": [
        {
          "graph_id": "graph_identifier",
          "parameters_id": "parameter_identifier", 
          "data_id": "data_identifier",
          "seed_range": [1, 5]
        }
      ],
      "evaluation": {
        "benchmarks": { ... },
        "graph_estimation": { ... }
      }
    }
  ],
  "resources": {
    "data": { ... },
    "graph": { ... },
    "parameters": { ... },
    "structure_learning_algorithms": { ... }
  }
}
```

## API Endpoints

### Configuration Management
- `GET /api/config` - List all configurations
- `GET /api/config/[id]` - Get specific configuration
- `POST /api/config` - Save new configuration

### Run Management  
- `GET /api/runs` - List all runs
- `GET /api/runs/[id]` - Get run details
- `POST /api/runs` - Start new benchmark run
- `DELETE /api/runs/[id]` - Stop running benchmark

## Supported Algorithms

The interface supports all algorithms available in Benchpress, including:

### Constraint-based
- PC Algorithm
- MMPC, MMHC
- FCI, RFCI

### Score-based
- FGES (Fast Greedy Equivalence Search)
- GES (Greedy Equivalence Search)
- Hill Climbing
- Tabu Search

### Bayesian MCMC
- BiDAG ITsearch
- BDgraph
- Order MCMC
- Partition MCMC

### Neural/Functional
- NOTEARS
- GraN-DAG
- CORL

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Backend**: Next.js API routes
- **Integration**: Snakemake workflow execution

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

## License

This project is licensed under the GPL-2.0 License - see the main Benchpress [LICENSE](../LICENSE) file for details.

## Related

- [Benchpress Documentation](https://benchpressdocs.readthedocs.io/)
- [Benchpress GitHub Repository](https://github.com/felixleopoldo/benchpress)
- [Snakemake Documentation](https://snakemake.readthedocs.io/)