import { getCurrentInstance } from '@nuxtjs/composition-api';
import type { AgnosticGroupedFacet } from '@vue-storefront/core';

const getInstance = () => {
  const vm = getCurrentInstance();
  return vm.root.proxy as any;
};

// eslint-disable-next-line
const useUiHelpers = () => {

  const instance = getInstance();
  const { query, path } = instance.$router.history.current;

  // eslint-disable-next-line
  const getFacetsFromURL = () => {
    const categorySlug = path.split('/c/')[1];

    return {
      categorySlug,
      brandFilter: query.brandId,
      variantFilter: query.variant,
      term: query.term || '',
      page: parseInt(query.page, 10) || 1,
      itemsPerPage: parseInt(query.itemsPerPage, 10) || 10,
      sort: query.sort || '-CreateDate'
    };

  };

  // eslint-disable-next-line
  const getCatLink = (category): string => {
    return `/c/${category.slug}`;
  };

  // eslint-disable-next-line
  const changeSorting = (sort) => {
    instance.$router.push({ query: { ...query, sort } });
  };

  // eslint-disable-next-line
  const changeFilters = (filters: any) => { 
    instance.$router.push({ query: { ...filters }});
  };

  // eslint-disable-next-line
  const changeItemsPerPage = (itemsPerPage) => {
    instance.$router.push({ query: { ...query, itemsPerPage }});
  };

  // eslint-disable-next-line
  const setTermForUrl = (term: string) => {
    instance.$router.push(path, { query, term });
  };

  // eslint-disable-next-line
  const isFacetColor = (facet: AgnosticGroupedFacet): boolean => facet.label === 'Color';

  // eslint-disable-next-line
  const isFacetPrice = (facet: AgnosticGroupedFacet): boolean => facet.label === 'Price';

  // eslint-disable-next-line
  const isFacetCheckbox = (facet: AgnosticGroupedFacet): boolean => !isFacetColor(facet);

  const getSearchTermFromUrl = () => getFacetsFromURL().term;

  return {
    getFacetsFromURL,
    getCatLink,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    setTermForUrl,
    isFacetColor,
    isFacetPrice,
    isFacetCheckbox,
    getSearchTermFromUrl
  };
};

export default useUiHelpers;
