const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#1DA57B',
              '@border-radius-base': '20px ',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
