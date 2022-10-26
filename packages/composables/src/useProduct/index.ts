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
      const productResult = await context.$shopiroller.api.getProduct(id);
      const { data } = productResult;
      return [data];

    } else {
      const productSearchResult = await context.$shopiroller.api.getProducts(searchParams);
      const { data } = productSearchResult;
      return data;
    }

  }
};

export const useProduct = useProductFactory<ProductSearchResult, SearchParams>(params);
