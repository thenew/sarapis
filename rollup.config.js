import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'

module.exports = [
  {
    input: 'src/server.mjs',
    output: {
      file: 'dist/main.js',
      format: 'cjs', // for Node.jS
      name: 'sarapis'
    },
    plugins: [
      nodeResolve({
        builtins: false
      }),
      commonjs({
        include: 'node_modules/**'
      }),
      json(),
      terser()
    ],
    external: ['universal-analytics', 'fs', 'http', 'path']
  }
]
