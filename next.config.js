module.exports = {
  webpack (config, options) {
    config.module.rules.push({
        test: /\.(jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
            loader: 'url-loader',
            options: {
                limit: 100000
            }
        }
    });
    return config;

  },
  reactStrictMode: true
}
