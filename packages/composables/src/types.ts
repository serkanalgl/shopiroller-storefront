import {
  ProductsSearchParams
} from '@vue-storefront/core';

import type { CategorySearchResult, Product } from '@vue-storefront/shopiroller-api';
import type { AgnosticGroupedFacet } from '@vue-storefront/core';

export type SearchParams = {
  categorySlug?: string;
  term?: string;
  priceFilter: string;
  brandFilter: [string];
  variantFilter: [string];

  page?: number;
  itemsPerPage?: number;
  sort?: string;
};

export type TODO = any;

export type UseBillingAddParams = TODO;

export type UseCategorySearchParams = TODO;

export type UseFacetSearchParams = SearchParams;

export type UseProductSearchParams = ProductsSearchParams;

export type UseReviewSearchParams = TODO;

export type UseReviewAddParams = TODO;

export type UseShippingAddParams = TODO;

export type UseStoreFilterParams = TODO;

export type UseUserUpdateParams = TODO;

export type UseUserRegisterParams = TODO;

export type useUserOrderSearchParams = TODO;

export type SearchData = {
  categories: CategorySearchResult;
  products: Product[],
  productsMeta: {
    queryCount: number;
    itemsCount: number;
  };
  facets: AgnosticGroupedFacet[];
  itemsPerPage: number;
};

