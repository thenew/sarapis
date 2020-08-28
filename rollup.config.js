module.exports = [
  {
    input: 'src/server.mjs',
    output: {
      file: 'dist/main.js',
      format: 'cjs', // for Node.jS
      name: 'sarapis'
    },
    external: ['fs', 'express', 'express-universal-analytics']
  }
]
