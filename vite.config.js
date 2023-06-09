import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), EnvironmentPlugin(['CLIENT_ID', 'CLIENT_SECRET'])],
  resolve: {
    alias: {
      // process: "process/browser",
      // stream: "stream-browserify",
      // zlib: "browserify-zlib",
      // util: "util",
      web3: path.resolve(__dirname, "./node_modules/web3/dist/web3.min.js"),
    },
  },
  define: {
    'process.env': {}
  }
})
