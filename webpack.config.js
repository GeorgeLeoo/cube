const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = {
  // 配置一些插件
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('./src/views/index.html'),
      minify: true,
      hash: false
    }),
    new VueLoaderPlugin()
  ],
  // 打包的入口文件
  entry: path.join(__dirname, "./src/views/index.js"),
  // 输出的出口文件
  output: {
    // 必须指定的是绝对路径
    path: path.join(__dirname, "./src/views/dist"),
    filename: 'js/[name].[hash].js',
  },
  devServer: {
    contentBase: resolve('./src/views/dist'),
    compress: true,
    port: 10024,
    hot: true,
    open: true
  },
  // 配置加载规则
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: resolve('node_modules')
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }
    ]
  }
};

module.exports = config;
