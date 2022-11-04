import type { ProductSearchResult, GetProductsParams } from '../../types';
import type { Context, AgnosticGroupedFacet } from '@vue-storefront/core';
import qs from 'qs';

export async function getProducts(context: Context, params: GetProductsParams): Promise<ProductSearchResult> {

  const { data: response } = await context.client.get('/v2.0/products/advanced-filtered', {
    params: params,
    paramsSerializer: (params:any) => {
      return qs.stringify(params);
    }
  });
  const { data: products, meta } = response;

  const { data: filterOptionsResponse } = await context.client.get('/v2.0/filterOptions', { params: { categoryId: params.categoryId} });
  const { data: filterOptions } = filterOptionsResponse;

  const facets = [];

  const brandFacet: AgnosticGroupedFacet = {
    id: 'brandId',
    label: 'brands',
    options: filterOptions?.brands?.map((o: any) => ({
      type: 'brand',
      id: o.id,
      value: o.name,
      selected: params?.brandId?.includes(o.id)
    }))
  };

  facets.push(brandFacet);

  if (filterOptions && filterOptions.variationGroups) {
    const variantFacets = filterOptions.variationGroups.map((variantGroup) => {
      return {
        id: 'variant',
        label: variantGroup.name,
        options: variantGroup.variations.map((variation: any) => {
          const id = variantGroup.id + ':' + variation.id;
          return {
            type: variation.value,
            id,
            value: variation.value,
            selected: params?.variantData?.includes(id)
          };
        })
      };
    });

    facets.push(...variantFacets);

  }

  return {
    data: products,
    meta: {
      ...meta,
      facets
    }
  };
}
