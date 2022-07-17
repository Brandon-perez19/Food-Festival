const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
    entry: {
        app: './assets/js/script.js',
        events: './assets/js/events.js',
        schedule: './assets/js/schedule.js',
        tickets: './assets/js/tickets.js'
    },
    output: {
        //must include public path to be an empty string. if not default value is /auto/ causing path to break/
        //application now works and can be downloaded due to publicpath 
        publicPath: "",
        path: path.join(__dirname + "/dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name(file) {
                                return '[path][name].[ext]';
                            },
                            publicPath(url) {
                                return url.replace('../', '/assets/');
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),
        new WebpackPwaManifest({
            name: 'Food Event',
            short_name: 'Foodies',
            description: 'An app that allows you to view upcoming food events.',
            start_url: '../index.html',
            background_color: '#01579b',
            theme_color: '#ffffff',
            fingerprints: false,
            inject: false,
            icons: [
                {
                    src: path.resolve('assets/img/icons/icon-512x512.png'),
                    sizes: [96, 128, 192, 256, 384, 512],
                    destination: path.join('assets', 'icons')
                }
            ]
        })
    ],
    mode: 'development'
};

module.exports = config;