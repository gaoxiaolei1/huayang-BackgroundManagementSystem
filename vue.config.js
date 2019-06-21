module.exports = {
  baseUrl: "/ca",
  chainWebpack: config => {
    // <link rel="prefetch">  是一种 resource hint，用来告诉浏览器在页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容。
    // https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  //  dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      "/feeduser": {
        target: "https://api.map.chinaso.com",
        changeOrigin: true
      }
    } // 设置代理
    // before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};
