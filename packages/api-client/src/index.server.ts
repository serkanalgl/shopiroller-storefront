import { apiClientFactory } from '@vue-storefront/core';
import axios from 'axios';

import { getProduct } from './api/getProduct';
import { getProducts } from './api/getProducts';
import { getCategories } from './api/getCategories';

function onCreate(settings) {

  const client = axios.create({
    baseURL: settings.api.url || 'https://api.shopiroller.com',
    headers: {
      'Api-Key': settings.api.apiKey,
      'App-Key': settings.api.appKey,
      'X-Fallback-Language': 'en',
      'Accept-Language': 'en'
    }
  });

  return {
    config: settings,
    client
  };

}

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api: {
    getProduct,
    getProducts,
    getCategories
  }
});

export {
  createApiClient
};
