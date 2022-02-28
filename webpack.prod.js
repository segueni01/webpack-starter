const HtmlWebPack    = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin     = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser       = require('terser-webpack-plugin');

module.exports = {
    mode:'production', //AQUI ESTAMOS ESCOGIENDO EL MONDO EN EL QUE QUEREMOS QUE SE EJECUTE EL main.js

    output: {
        clean: true, //BORRA TODO Y LO VUELVE A CREAR (SUPER UTIL)
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [  //AQUI DECLARO LAS REGLAS DE MI WEBPACK
            {
                test: /\.html$/,  // AQUI SE INDICA QUE ESTAS REGLAS SERAN DEL HTML
                loader: 'html-loader',
                options: {
                    sources: false  //CON ESTA LINEA QUIERO DECIUR QUE NO SE CAMBIEN LOS SOURCES
                }
            },
            {
                test: /\.css$/, // AQUI SE INDICA QUE ESTAS REGLAS SERAN DEL CSS
                exclude: /styles.css$/, //AQUI EXCLUYO ESTE ARCHIVO
                use: [ 'style-loader', 'css-loader'] 
            },
            {
                test: /styles.css$/,
                use: [ MiniCssExtract.loader, 'css-loader' ]

            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                    loader: 'file-loader',
                
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },

    optimization:{
        minimize: true,
        minimizer:[
            new CssMinimizer(),
            new Terser(),
        ]
    }, 

    plugins: [
        new HtmlWebPack({   // CON ESTE CREO EL ARCHIVO HTML EN LA CARPETA DIST
            title: 'Mi Webpack App',  //EL TITULO DEL HTML
            filename: 'index.html',  //AQUI VA EL NOMBRE DEL HTML
            template: './src/index.html' //EL ARCHIVO EN EL CUAL SE COPIARA
        }),

        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),

        new CopyPlugin({ //ESTE PLUGIJN LO QUE HACE ES COPIAR ARCHIVOS(IMAGENES, PDF...) DEL PROYECTO A LA CARPETA DIST
            patterns: [
                {from: 'src/assets', to:'assets/'}
            ]
             
        })
    ]
}