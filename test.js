const Analyze = require('./Analyze.js').Analyze;

config ={
    outputDir:'./test/dist',
    outputFile:'index.js',
    inputDir:'./test/src',
    inputFile:'index.js',
}

new Analyze(config);