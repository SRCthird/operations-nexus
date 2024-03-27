const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@templates': path.resolve(__dirname, 'src/plugins/templates/'),
      '@hooks': path.resolve(__dirname, 'src/webhooks/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@context': path.resolve(__dirname, 'src/context/'),
      '@apps': path.resolve(__dirname, 'src/plugins/apps/'),
    }
  },
};
