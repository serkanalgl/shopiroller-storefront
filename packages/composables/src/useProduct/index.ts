import {
  Context,
  useProductFactory,
  UseProductFactoryParams
} from '@vue-storefront/core';
import type { ProductSearchResult } from '@vue-storefront/shopiroller-api';
import type {
  UseProductSearchParams as SearchParams
} from '../types';

const params: UseProductFactoryParams<ProductSearchResult, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  productsSearch: async (context: Context, params) => {

    const { id, ...searchParams } = params;

    if (id) {
      const product = await context.$shopiroller.api.getProduct(id);
      return [product];

    } else {
      const { data: products } = await context.$shopiroller.api.getProducts(searchParams);
      return products;
    }

  }
};

export const useProduct = useProductFactory<ProductSearchResult, SearchParams>(params);
