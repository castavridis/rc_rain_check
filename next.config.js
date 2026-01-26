const path = require('path')

module.exports = {
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: 'tsconfig.json',
  },
  turbopack: {
    root: path.join(__dirname, '..'),
  },
}