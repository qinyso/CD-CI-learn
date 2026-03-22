// 1. 导入核心依赖
import js from "@eslint/js"; // ESLint 官方内置的 JS 规则包
import pluginReact from "eslint-plugin-react"; // React 插件，支持 React 规则a
import globals from "globals"; // 全局变量定义包（如window、process）
import { defineConfig } from "eslint/config"; // ESLint 配置辅助函数
import pluginImport from "eslint-plugin-import"; // 导入插件，支持检测动态import导入语法
// 2. 导出配置（数组结构）
export default defineConfig([
  // 第一组规则：匹配 JS 文件
  { 
    ignores: ["**/node_modules/**"],
    // 匹配的文件范围（支持通配符）
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    // 启用的插件（新版直接用导入的变量，旧版是字符串数组）
    plugins: { js ,
      import: pluginImport, //让ESlint支持检测动态import导入语法
    }, 
    // 继承的规则集（旧版是 extends 数组，新版直接引用导入的规则）
    extends: ["js/recommended"], 
    // 语言环境配置（旧版的 env + parserOptions 合并）
    languageOptions: { 
      // 全局变量：允许使用浏览器环境的全局变量（如window、document）
      globals: globals.browser 
    } 
  },
  // 第二组规则：React 推荐规则（插件自带的预设配置）
  pluginReact.configs.flat.recommended,
]);