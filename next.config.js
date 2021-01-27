module.exports = {
  webpack: (config) => {
    config.node = {
      fs: 'empty'
    };
    return config;
  },
  images: {
    domains: ['images2.imgbox.com'],
    deviceSizes: [700, 1024, 1044]
  }
};
