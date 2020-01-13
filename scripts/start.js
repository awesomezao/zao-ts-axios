process.env.NODE_ENV='development'


const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const baseConfig = require('../config/webpack.config');
const devserverFactory=require('../config/devserver')

let env = process.env.NODE_ENV || 'development'
const HOST = process.env.HOST || '0.0.0.0';
const PORT=3000

const compiler = webpack(baseConfig(env));
const devServer = new WebpackDevServer(compiler, devserverFactory())
devServer.listen(PORT, HOST, err => {
  if (err) {
    return console.error(err)
  }
})


// let watchOptions = {
//   aggregateTimeout: 500,
//   ignored: '/node_modules/',
//   poll: 1000,
//   'info-verbosity': 'info'
// };

// let compiler = webpack(baseConfig);
// compiler.apply(new webpack.ProgressPlugin())

// compiler.run(function (err,stats) {
//   if (err || stats.hasErrors()) {
//     console.log(err||stats)
//   } else {
//     console.log('sucess')
//   }
// })
// compiler.watch(watchOptions, (err, stats) => {
//   if (err) {
//     console.error(err.stack || err);
//     if (err.details) {
//       console.error(err.details);
//     }
//     return;
//   }
//   let info = stats.toJson();
//   if (stats.hasErrors()) {
//     console.error(info.errors);
//   }
//   if (stats.hasWarnings()) {
//     console.warn(stats.toJson());
//   }
// });
