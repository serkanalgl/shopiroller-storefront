import type { ProductSearchResult, GetProductsParams } from '../../types';
import type { Context } from '@vue-storefront/core';

export async function getProducts(context: Context, params: GetProductsParams): Promise<ProductSearchResult> {

  const { data: response } = await context.client.get('/v2.0/products/advanced-filtered', { params: params });
  const { data: products, meta } = response;

  return {
    data: products,
    meta: meta
  };
}
