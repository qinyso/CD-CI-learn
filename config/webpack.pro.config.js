// 引入node.js的path模块（webpack官方要求，用于处理文件路径）
const path = require('path');
// 引入HTMLWebpackPlugin插件（用于自动生成HTML文件）
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入ESLintWebpackPlugin插件（用于ESLint检查）
const ESLintPlugin = require('eslint-webpack-plugin');
// 引入CSSMinimizerPlugin插件（用于压缩CSS）
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// 引入TerserWebpackPlugin插件（用于压缩JS，Webpack5生产模式默认自带，显式配置需引入）
const TerserWebpackPlugin = require('terser-webpack-plugin');
// 引入MiniCssExtractPlugin插件（生产模式提取CSS到单独文件）
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 获取CPU核心数，用于多进程压缩
const threads = require('os').cpus().length;

// webpack的核心配置对象（顶层属性：mode/entry/output/module/plugins/optimization等）
module.exports = {
  // 1. 模式配置（顶层）
  mode: 'production',

  // 2. 入口配置（顶层）
  entry: './src/index.js',

  // 3. 输出配置（顶层）
  output: {
    filename: 'bundle.[contenthash:8].js', // 生产模式加哈希防缓存
    path: path.resolve(__dirname, '../dist'),
    clean: true
  },

  optimization: {
    minimizer: [
      // JS压缩（多进程）
      new TerserWebpackPlugin({
        parallel: threads
      }),
      // CSS压缩
      new CssMinimizerPlugin()
    ]
  },

  // 5. 模块规则（顶层）
  module: {
    rules: [
      // 处理.css文件（生产模式用MiniCssExtractPlugin.loader替代style-loader）
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'], // 执行顺序：从右到左
      },
      // 处理Less文件
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      // 处理Babel
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // 图片处理
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          }
        },
        generator: {
          filename: 'images/[name][ext]',
        }
      },
    ]
  },

  // 6. 插件配置（顶层！和module平级，不能放module内部）
  plugins: [
    // ESLint检查（只需要实例化一次，避免重复）
    new ESLintPlugin({
      context: './src',
      fix: true,
    }),
    // 自动生成HTML
    new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../index.html'),
    filename: 'index.html', // 显式指定输出文件名
    inject: 'body' // 确保把 JS/CSS 自动注入到 HTML 里
    }),
    // 生产模式提取CSS到单独文件
    new MiniCssExtractPlugin({
      filename: 'static/css/main.[contenthash:8].css' // 加哈希防缓存
    })
    // CssMinimizerPlugin放在optimization.minimizer里，这里不用重复加！
  ],

  // 7. 开发工具（生产模式建议用source-map，避免暴露源码）
  devtool: 'source-map'
};