const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@Components': path.resolve(__dirname, 'src/components'),
    }
  },
};
