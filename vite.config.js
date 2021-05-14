/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-05-13 15:22:34
 * @Description: 
 */
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import commonjs from '@rollup/plugin-commonjs';
// import vitePluginImp from "vite-plugin-imp";
// const srcPath = path.resolve(__dirname, './src');
import { defineConfig } from "vite";
export default defineConfig({
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    }
  },
  plugins: [
    vue(),
    vueJsx()
  ],
  build:{
    commonjsOptions:{
      requireReturnsDefault:true
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    },
  }
  
  
  // chainWebpack: (config) => {
  //   config.module.rule('md')
  //     .test(/\.md/)
  //     .use('text-loader')
  //     .loader('text-loader')
  //     .options({
  //       raw: true
  //     })
  //   config.resolve.extensions.add('.ts').add('.tsx')
  //     .end().end()
  //     .module
  //     .rule('typescript')
  //     .test(/\.tsx?$/)
  //     .use('babel-loader')
  //     .loader('babel-loader')
  //     .end()
  //     .use('ts-loader')
  //     .loader('ts-loader')
  //     .options({
  //       transpileOnly: true,
  //       appendTsSuffixTo: [
  //         '\\.vue$',
  //       ],
  //       happyPackMode: false,
  //     })
  //     .end();
  // },

})
