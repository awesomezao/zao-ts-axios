import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';

const pkg = require('./package.json');

export default {
  input: `src/index.ts`,
  output: [
    {
      file: 'dist/zao-ts-axios.umd.js',
      name: 'zao-ts-axios',
      format: 'umd',
      sourcemap: true
    },
    { file: 'dist/zao-ts-axios.es5.js', format: 'es', sourcemap: true }
  ],
  plugins: [
    resolve(),
    commonjs(),
    sourceMaps(),
    typescript(
      {
        useTsconfigDeclarationDir: true,
        objectHashIgnoreUnknownHack: false 
      }
    ),
    json()
  ]
};
