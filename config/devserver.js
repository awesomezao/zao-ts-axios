module.exports=function () {
  return {
    hot: true,
    contentBase: '../dist',
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        pathRewrite: {
          '^/api':''
        },
        changeOrigin:true
      }
    }
  }
}