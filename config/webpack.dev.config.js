// 引入核心依赖
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// ======================== 核心：封装 loader 函数 ========================
/**
 * 封装样式文件的 loader 生成函数
 * @param {string} preProcessor - 可选的预处理器 loader（如 'less-loader'）
 * @returns {Array} 完整的 loader 数组
 */
function getStyleLoaders(preProcessor) {
  // 基础 loader 数组（CSS + PostCSS）
  const loaders = [
    // 开发模式用 style-loader（热更新快），生产模式替换为 MiniCssExtractPlugin.loader
    'style-loader', 
    'css-loader', // 解析 CSS 为 JS 模块
    {
      loader: 'postcss-loader', // PostCSS 兼容处理
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env'] // 自动加浏览器前缀
        }
      }
    }
  ];

  // 如果有预处理器（如 less-loader），添加到数组末尾
  if (preProcessor) {
    loaders.push(preProcessor);
  }

  // 过滤无效值，返回最终 loader 数组
  return loaders.filter(Boolean);
}

// ======================== Webpack 核心配置 ========================
module.exports = {
  // 模式（开发/生产）
  mode: 'development',

  // 入口
  entry: './src/index.js',

  // 输出
  output: {
    filename: 'bundle.js',
    path: undefined, // 开发模式不输出到磁盘（内存中运行）
    clean: true // 打包前清空输出目录（生产模式生效）

  },
    


  // 模块规则（使用封装的 loader 函数）
  module: {
    rules: [
      // 1. 处理 CSS 文件（无预处理器）
      {
        test: /\.css$/i,
        use: getStyleLoaders() // 不传参数，只加载基础 loader
      },

      // 2. 处理 Less 文件（传入 less-loader 预处理器）
      {
        test: /\.less$/i,
        use: getStyleLoaders('less-loader') // 传入预处理器
      },

      // 3. 处理 Babel（无需封装，逻辑唯一）
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

      // 4. 图片处理（无需封装，逻辑唯一）
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8KB 以下转 base64
          }
        },
        generator: {
          filename: 'images/[name][ext]'
        }
      }
    ]
  },

  // 插件（和 module 平级！）
  plugins: [
    // ESLint 检查
    new ESLintPlugin({
      context: './src', // 检查 src 目录
      fix: true // 自动修复可修复的错误
    }),

    // 自动生成 HTML
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html')
    })

    // 开发模式注释掉 CSS 提取插件，生产模式放开
    // new MiniCssExtractPlugin({
    //   filename: 'static/css/main.css'
    // })
  ],

  // 开发服务器
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true
  },

  // 调试工具
  devtool: 'inline-source-map'
};