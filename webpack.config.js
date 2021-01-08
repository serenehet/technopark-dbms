const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: [
        './src/index.ts'
    ],
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'node',
    externals: [nodeExternals()],
    watch: true,
    module: {
        rules: [
            {
                test: '/\.js?$/',
                exclude: /node_modules/,
                use:    {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env']
                    }
                },
            },
            {
                test: /\.ts|\.tsx$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },

    resolve: {
        plugins: [new TsconfigPathsPlugin()],
        extensions: ['.js', '.ts'],
    },
};
