import {ModuleOptions} from 'webpack'
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import ReactRefreshTypeScript from 'react-refresh-typescript'
import {buildBabelLoader} from "./babel/buildBabelLoader";


export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {

    const isDev = options.mode === 'development'
    const isProd = options.mode === 'production'


    const assetLoader = {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset/resource'
    }

    const svgLoader =
        {
            test: /\.svg$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        icon: true,
                        svgConfig: {
                            plugins: [
                                {
                                    name: 'convertColors',
                                    params: {
                                        currentColor: true
                                    }
                                }
                            ]
                        }
                    },

                }
            ],
        }


    const cssLoaderWithModule = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            }
        }

    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            cssLoaderWithModule,
            "sass-loader"
        ]
    }

    // const tsLoader = {
    //      ts loader умеет работать с jsx
    //     без Ts нужен babel-loader
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    // }

    const tsLoader =
        {
            //      ts loader умеет работать с jsx
            //     без Ts нужен babel-loader
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        getCustomTransformers: () => ({
                            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                        }),

                    }
                }
            ]
        }

    const babelLoader = buildBabelLoader(options)


    return [
        scssLoader,
        //tsLoader,
        assetLoader,
        svgLoader,
        babelLoader
    ]
}
