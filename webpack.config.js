const webpack = require('@nativescript/webpack')
const { resolve } = require('path')

module.exports = (env) => {
  webpack.init(env)

  // https://docs.nativescript.org/webpack

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
      .set('@bosons', resolve(__dirname, './src/components/bosons'))
      .set('@quarks', resolve(__dirname, './src/components/quarks'))
      .set('@atoms', resolve(__dirname, './src/components/atoms'))
      .set('@molecules', resolve(__dirname, './src/components/molecules'))
      .set('@organisms', resolve(__dirname, './src/components/organisms'))
      .set('@templates', resolve(__dirname, './src/components/templates'))
  })

  return webpack.resolveConfig()
}
