const path = require('path')

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
    tsconfigPath: 'tsconfig.json',
  },
  turbopack: {
    root: path.join(__dirname, '..'),
  },
}