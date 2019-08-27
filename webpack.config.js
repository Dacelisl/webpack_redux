/* const path = require('path'); */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtract = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {

    entry: {
        js: './src/index.js',
        vanilla: './src/vanilla.js',
    },
    output: {
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            /* {
              test: /\.css$/,
              use: ExtractTextPlugin.extract({
                use: "css-loader"
              })
            }, */
            {
                test: /\.js/,
                exclude: /node_modules/,
                //necesario archivo .babelrc con el contenido [{"presets": ["env"]}]
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: 'html-loader?minimize',
            },
            //configuracion para css y sass, instalar style-loader, mini-css-extract-plugin, css-loader, sass-loader, node-sass
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader', //los loader van en orden de importancia, style-loader convierte los archivos css y scss en formato js
                    MiniCSSExtract.loader,
                    'css-loader?sourceMap',
                    'postcss-loader?sourceMap', //necesita un archivo llamado .postcss.config.js [module.exports = {plugins:[require('autoprefixer')}]
                    'resolve-url-loader', //antes del compilador que trnasforma el css  sass-loader
                    'sass-loader?outputStyle=compressed&sourceMap'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/i,
                use: [
                    'file-loader?name=assets/[name].[ext]', //nombre de la carpeta donde se guardaran los archivos
                    'image-webpack-loader?bypassOnDebug'

                ]
            },
            {
                test: /\.(ttf|eot|woff2?|mp4|mp3|txt|xml|pdf)$/i,
                use: 'file-loader?name=assets/[name].[ext]',
            }
        ]
    },
    //complementos para optimizacion
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
        new ExtractTextPlugin("bundle.css"),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './template.html',
            hash: true,
            chunks: ['js']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './template-vanilla.html',
            hash: true,
            chunks: ['vanilla']
        }),
        new CleanWebpackPlugin(),
        new MiniCSSExtract({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
    ]
}