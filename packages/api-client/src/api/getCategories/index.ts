import type { CategorySearchResult } from '../../types';
import type{ Context } from '@vue-storefront/core';

export async function getCategories(context: Context): Promise<CategorySearchResult> {
  const { data } = await context.client.get('/v2.0/categories');
  return data;
}
