process.env.NODE_ENV = 'production';


const webpack = require('webpack');
const baseConfig = require('../config/webpack.config');

let env = process.env.NODE_ENV||'production';
let compiler = webpack(baseConfig(env))

compiler.run((err, stats) => {
  if (err) {
    
    
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }
  let info = stats.toJson();
  if (stats.hasErrors()) {
    console.log(info.errors.toString());
  }
  if (stats.hasWarnings()) {
    console.log(info.warnings.toString());
  }
});
