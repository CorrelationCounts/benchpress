# Quick Start Guide

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18 or later
- npm (included with Node.js)
- A working Benchpress installation in the parent directory

### 2. Quick Start
```bash
# Navigate to the web interface directory
cd benchpress-web

# Run the startup script
./start.sh
```

### 3. Manual Start
```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start the production server
npm start
```

### 4. Development Mode
```bash
# Start development server with hot reload
npm run dev
```

## 📱 Using the Web Interface

### Creating Configurations
1. Click **"Configurations"** in the sidebar
2. Click **"New Configuration"**
3. Fill in the benchmark details:
   - Set a title for your benchmark
   - Configure data generation parameters
   - Select algorithms to compare
4. Preview the JSON configuration
5. Save or export the configuration

### Running Benchmarks
1. Go to **"Configurations"** and select a saved configuration
2. Click **"Run Benchmark"**
3. Monitor progress in the **"Runs"** section
4. View results once completed

### Analyzing Results
1. Navigate to **"Analytics Dashboard"**
2. Choose from different analysis views:
   - **Overview**: Summary metrics
   - **Algorithm Comparison**: Performance vs execution time
   - **Performance Metrics**: Detailed accuracy measurements
   - **ROC Analysis**: Receiver operating characteristic curves

## 🔧 Configuration

The web interface automatically connects to Benchpress configurations in the parent directory. Make sure your Benchpress installation is properly set up before using the web interface.

## 📊 Understanding the Dashboard

### Key Metrics
- **F1 Score**: Harmonic mean of precision and recall
- **SHD (Structural Hamming Distance)**: Number of edge differences
- **Precision**: True positives / (True positives + False positives)
- **Recall**: True positives / (True positives + False negatives)

### Chart Types
- **Bar Charts**: Compare metrics across algorithms
- **Scatter Plots**: Explore relationships between metrics
- **Line Charts**: Track execution time trends
- **ROC Curves**: Visualize true/false positive rates

## 🛠️ Troubleshooting

### Build Issues
If you encounter build errors:
1. Ensure Node.js 18+ is installed
2. Delete `node_modules` and run `npm install` again
3. Check that all dependencies are properly installed

### Connection Issues
If the web interface cannot connect to Benchpress:
1. Verify Benchpress is installed in the parent directory
2. Check that configuration files exist in `../config/`
3. Ensure Snakemake is properly installed and accessible

### Performance Issues
For better performance:
1. Use the production build (`npm run build` + `npm start`)
2. Ensure adequate system resources for benchmark execution
3. Monitor running processes in the "Runs" section

## 📚 Additional Resources

- [Benchpress Documentation](https://benchpressdocs.readthedocs.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Support

For issues specific to the web interface, please check the main Benchpress repository or documentation. For Benchpress-related questions, refer to the official documentation and support channels.

