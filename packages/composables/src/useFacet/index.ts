import {
  Context,
  useFacetFactory,
  FacetSearchResult
} from '@vue-storefront/core';
import type {
  UseFacetSearchParams as SearchParams
} from '../types';

import { GetProductsParams } from '@vue-storefront/shopiroller-api';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<SearchParams>) => {
    console.log('facet search', params);
    const searchParams = params.input as SearchParams;
    const slugItems = searchParams.categorySlug?.split('-');
    const categoryId = slugItems[slugItems.length - 1];

    const categoriesResponse = await context.$shopiroller.api.getCategories();
    const categories = categoriesResponse.data;

    const getProductsParams: GetProductsParams = {
      categoryId: categoryId,
      page: searchParams.page,
      perPage: searchParams.itemsPerPage || 25,
      sort: searchParams.sort,
      term: undefined,
      price: undefined
    };

    const productsResponse = await context.$shopiroller.api.getProducts(getProductsParams);
    const { data: products, meta: productsMeta } = productsResponse;

    return {
      categories,
      products,
      productsMeta,
      itemsPerPage: searchParams.itemsPerPage || 25
    };
  }
};

export const useFacet = useFacetFactory<SearchParams>(factoryParams);
