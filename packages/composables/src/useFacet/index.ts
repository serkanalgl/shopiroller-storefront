import {
  Context,
  useFacetFactory,
  FacetSearchResult
} from '@vue-storefront/core';
import type {
  SearchData,
  UseFacetSearchParams as SearchParams
} from '../types';

import { GetProductsParams } from '@vue-storefront/shopiroller-api';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<SearchData>): Promise<SearchData> => {

    const searchParams = params.input as SearchParams;
    const slugItems = searchParams.categorySlug?.split('-');
    const categoryId = slugItems[slugItems.length - 1];

    const categoriesResponse = await context.$shopiroller.api.getCategories();
    const categories = categoriesResponse.data;

    const groupBy = (array) => {
      // Return the end result
      return array.reduce((result, currentValue) => {
        const variantGroupId = currentValue.split(':')[0];
        const variantId = currentValue.split(':')[1];
        (result[variantGroupId] = result[variantGroupId] || []).push(variantId);
        return result;
      }, {});
    };

    const variantFilter = groupBy(searchParams.variantFilter || []);

    const getProductsParams: GetProductsParams = {
      categoryId: categoryId,
      page: searchParams.page,
      perPage: searchParams.itemsPerPage || 25,
      sort: searchParams.sort.startsWith('-') ? searchParams.sort.slice(1) : searchParams.sort,
      sortBy: searchParams.sort.startsWith('-') ? 'Descending' : 'Ascending',
      term: undefined,
      price: undefined,
      brandId: searchParams.brandFilter,
      variantData: Object.keys(variantFilter).map((key) => {
        return key + ':' + variantFilter[key].join(':');
      }).join(';')

    };

    const productsResponse = await context.$shopiroller.api.getProducts(getProductsParams);
    const { data: products, meta: productsMeta } = productsResponse;

    const facets = [...productsMeta.facets];
    console.log('facets', facets);
    return {
      categories,
      products,
      productsMeta,
      facets,
      itemsPerPage: searchParams.itemsPerPage || 25
    };
  }
};

export const useFacet = useFacetFactory<SearchData>(factoryParams);
