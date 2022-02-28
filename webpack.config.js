const HtmlWebPack    = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin     = require("copy-webpack-plugin");

module.exports = {
    mode:'development', //AQUI ESTAMOS ESCOGIENDO EL MONDO EN EL QUE QUEREMOS QUE SE EJECUTE EL main.js

    output: {
        clean: true //BORRA TODO Y LO VUELVE A CREAR (SUPER UTIL)
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
                    options: {
                        name: 'hola.[ext]',
                      },
                
            }
        ]
    },

    optimization: {},

    plugins: [
        new HtmlWebPack({   // CON ESTE CREO EL ARCHIVO HTML EN LA CARPETA DIST
            title: 'Mi Webpack App',  //EL TITULO DEL HTML
            filename: 'index.html',  //AQUI VA EL NOMBRE DEL HTML
            template: './src/index.html' //EL ARCHIVO EN EL CUAL SE COPIARA
        }),

        new MiniCssExtract({
            filename: '[name].css',
            ignoreOrder: false
        }),

        new CopyPlugin({ //ESTE PLUGIJN LO QUE HACE ES COPIAR ARCHIVOS(IMAGENES, PDF...) DEL PROYECTO A LA CARPETA DIST
            patterns: [
                {from: 'src/assets', to:'assets/'}
            ]
             
        })
    ]
}