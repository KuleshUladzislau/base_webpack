import webpack, {Configuration,DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import  ReactRefreshTypeScript from 'react-refresh-typescript'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import path from "path";
import CopyPlugin from "copy-webpack-plugin";
export function buildPlugins(options: BuildOptions): Configuration['plugins'] {

    const {
        mode,
        paths,
        analyzer,
        platform
    } = options

    const isDev = mode === 'development'
    const isProd = mode === 'production'


    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({template: paths.html,favicon:path.resolve(paths.public,'favicon.ico')}),
        new DefinePlugin({
           __PLATFORM__: JSON.stringify(platform),
           __ENV__: JSON.stringify(platform),
        }),
        new ForkTsCheckerWebpackPlugin()
    ]

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin())
        plugins.push(new ReactRefreshWebpackPlugin())

    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            })
        )

        plugins.push(new CopyPlugin({
            patterns: [
                { from: path.resolve(paths.public,'locales') , to:path.resolve(paths.output,'locales') },
            ],
        }),)

    }

    if(analyzer){
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins
}
