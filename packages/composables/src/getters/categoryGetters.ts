import { AgnosticCategoryTree, AgnosticFacetSearchParams } from '@vue-storefront/core';
import type { Category } from '@vue-storefront/shopiroller-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTree(categories: Category[], input: AgnosticFacetSearchParams): AgnosticCategoryTree {

  const itemToTree = (c: Category) => {

    const categorySlug = createSlug(c.name, c.categoryId);
    return {
      label: c.name,
      slug: categorySlug,
      items: c.subCategories ? c.subCategories.map(itemToTree) : [],
      isCurrent: categorySlug === input.categorySlug
    };
  };

  return {
    label: 'root',
    slug: 'root',
    items: categories.map((category:Category) => itemToTree(category)),
    isCurrent: false
  };

}

function getCategoryId(category: Category): string {
  return category.categoryId;
}

function getName(category: Category): string {
  return category.name;
}

function getSlug(category: Category): string {
  return createSlug(category.name, category.categoryId);
}

function createSlug(name: string, categoryId: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '') + '-' + categoryId;
}

export const categoryGetters: any = {
  getTree,
  getCategoryId,
  getName,
  getSlug
};
