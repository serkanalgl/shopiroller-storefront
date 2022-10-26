import type { ProductSearchResult, GetProductsParams } from '../../types';
import type{ Context } from '@vue-storefront/core';

export async function getProducts(context: Context, params: GetProductsParams): Promise<ProductSearchResult> {
  const { data } = await context.client.get('/v2.0/products/advanced-filtered', { params: params });
  return data;
}
