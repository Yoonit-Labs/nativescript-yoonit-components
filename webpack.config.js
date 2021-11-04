/**
 * ██╗   ██╗ ██████╗  ██████╗ ███╗   ██╗██╗████████╗
 * ╚██╗ ██╔╝██╔═══██╗██╔═══██╗████╗  ██║██║╚══██╔══╝
 *  ╚████╔╝ ██║   ██║██║   ██║██╔██╗ ██║██║   ██║
 *   ╚██╔╝  ██║   ██║██║   ██║██║╚██╗██║██║   ██║
 *    ██║   ╚██████╔╝╚██████╔╝██║ ╚████║██║   ██║
 *    ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝   ╚═╝
 *
 * https://yoonit.dev - about@yoonit.dev
 *
 * NativeScript Yoonit Components
 * NativeScript VueJS Atomic Design System framework
 *
 * Luigui Delyer @ 2021
 */

// https://docs.nativescript.org/webpack

const webpack = require('@nativescript/webpack')
const { resolve } = require('path')

module.exports = env => {
  webpack.init(env)

  webpack.chainWebpack(config => {
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
      .loader('pug-plain-loader')
      .end()

    config.module
      .rule('scss')
      .test(/\.(sass|scss)$/)
      .use('sass-loader')
      .options({
        sassOptions: {
          indentedSyntax: true
        }
      })

    config.resolve
      .alias
      .set('@', resolve(__dirname, './src'))
      .set('@bosons', resolve(__dirname, './src/components/bosons/index.js'))
      .set('@quarks', resolve(__dirname, './src/components/quarks/index.js'))
      .set('@atoms', resolve(__dirname, './src/components/atoms/index.js'))
      .set('@molecules', resolve(__dirname, './src/components/molecules/index.js'))
      .set('@organisms', resolve(__dirname, './src/components/organisms/index.js'))
      .set('@templates', resolve(__dirname, './src/components/templates/index.js'))
  })

  return webpack.resolveConfig()
}
