import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-node-polyfills';

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
        preferBuiltins: false,
      }),
      commonjs({
        include: 'node_modules/**'
      }),
      json(),
      nodePolyfills()
    ],
    external: ['express', 'fs']
  }
]
