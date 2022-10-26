import type{ Context } from '@vue-storefront/core';

export async function getProduct(context: Context, productId: string): Promise<any> {
  const { data } = await context.client.get(`/v2.0/products/${productId}`);
  return data;
}
