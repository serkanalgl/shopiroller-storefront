import {
  FacetsGetters,
  FacetSearchResult,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet
} from '@vue-storefront/core';
import type { Facet, FacetSearchCriteria } from '@vue-storefront/shopiroller-api';
import { categoryGetters } from './categoryGetters';
import { SearchData } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAll(searchData: FacetSearchResult<SearchData>, criteria?: FacetSearchCriteria): AgnosticFacet[] {
  return searchData.data ? searchData.data.facets.flatMap(facet => facet.options) : [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getGrouped(searchData: FacetSearchResult<SearchData>, criteria?: FacetSearchCriteria): AgnosticGroupedFacet[] {
  return searchData.data ? searchData.data.facets : [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSortOptions(params: FacetSearchResult<Facet>): AgnosticSort {

  const { sort } = params.input;

  const options = [
    {type: 'sort', id: 'Price', value: 'composables.facet_getters.sort_price_lowest'},
    {type: 'sort', id: '-Price', value: 'composables.facet_getters.sort_price_highest'},
    {type: 'sort', id: '-Stats.OrderCount', value: 'composables.facet_getters.sort_bestsellers'},
    {type: 'sort', id: '-CreateDate', value: 'composables.facet_getters.sort_newest'}
  ];

  const selectedOption = options.find(option => option.id === sort);

  return { options, selected: selectedOption ? selectedOption.id : '' };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCategoryTree(searchData: FacetSearchResult<SearchData>): AgnosticCategoryTree {
  const categoryTree = searchData.data ? categoryGetters.getTree(searchData.data.categories, searchData.input) : {} as any;
  return categoryTree;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getProducts(searchData: FacetSearchResult<SearchData>): any {
  return (searchData && searchData.data) ? searchData.data.products : [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getPagination = (searchData: FacetSearchResult<SearchData>): AgnosticPagination => searchData.data ? ({
  currentPage: searchData.input.page,
  totalPages: searchData.data.productsMeta.itemsCount % searchData.input.page,
  totalItems: searchData.data.productsMeta.itemsCount,
  itemsPerPage: searchData.data.itemsPerPage,
  pageOptions: [10, 20, 40]
}) : {} as AgnosticPagination;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getBreadcrumbs(params: FacetSearchResult<Facet>): AgnosticBreadcrumb[] {
  return [];
}

export const facetGetters: FacetsGetters<Facet, FacetSearchCriteria> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};
