module.exports = {
  plugins: {
    // 插件1：自动加浏览器前缀（核心效果）
    autoprefixer: {
      // 兼容目标：最后 2 个版本、覆盖 99% 浏览器
      overrideBrowserslist: ['last 2 versions', '> 99%']
    },
    // 插件2：降级 CSS 新特性（比如原生嵌套）
    'postcss-preset-env': {
      stage: 3, // 支持稳定的 CSS 新特性
      features: {
        'nesting-rules': true // 启用 CSS 原生嵌套语法降级
      }
    }
  }
};