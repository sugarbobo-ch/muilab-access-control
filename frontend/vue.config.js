module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/custom.scss";
        `
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'MUILab 實聯制門禁系統'
        return args
      })
  }
}
