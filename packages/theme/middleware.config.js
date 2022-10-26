require('dotenv').config({ path: `./../../.env` });

module.exports = {
  integrations: {
    shopiroller: {
      location: '@vue-storefront/shopiroller-api/server',
      configuration: {
        api: {
          url: process.env.SHOPIROLLER_API_URL,
          apiKey: process.env.SHOPIROLLER_API_APIKEY,
          appKey: process.env.SHOPIROLLER_API_APPKEY,
        }
      }
    }
  }
};