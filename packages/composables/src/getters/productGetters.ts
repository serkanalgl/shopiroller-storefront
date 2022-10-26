import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters,
  AgnosticBreadcrumb
} from '@vue-storefront/core';
import type { Product, ProductFilter, Image } from '@vue-storefront/shopiroller-api';
import _ from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getName(product: Product): string {
  return product.title;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSlug(product: Product): string {
  return product.title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPrice(product: Product): AgnosticPrice {
  return {
    regular: product.price,
    special: product.campaignPrice || undefined
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getGallery(product: Product): AgnosticMediaGalleryItem[] {
  return product?.images?.map((image:Image)=>{
    return {
      small: image.t,
      normal: image.n,
      big: image.n
    };
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCoverImage(product: Product): string {
  return product?.featuredImage?.n;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFiltered(products: Product[], filters: ProductFilter): Product[] {
  return products;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAttributes(products: Product[] | Product, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> {

  const isSingleProduct = !Array.isArray(products);
  const productList = (isSingleProduct ? [products] : products) as Product[];
  if (!products || productList.length === 0) {
    return {};
  }

  const variationGroups = _.uniqBy(productList.flatMap((product) => product.variationGroups), (vg) => vg.id);
  const variations = _.uniqBy(variationGroups.flatMap((variationGroup) => variationGroup.variations), (v) => v.id);

  const findVariationGroupName = (variationValue) => {
    const variationGroup = variationGroups.find((variationGroup) => {
      return variationGroup.variations.find((variation) => variation.value === variationValue);
    });

    return variationGroup ? variationGroup.name : undefined;
  };

  const options = variations.map((variation) => {
    const variationGroupName = findVariationGroupName(variation.value);
    return {
      name: variationGroupName,
      value: variation.value,
      label: variation.value
    };
  }).filter((option) => filterByAttributeName ? filterByAttributeName.includes(option.name) : true);

  return options.reduce((acc, currAttr) => ({
    ...acc,
    [currAttr.name]: isSingleProduct ? currAttr.value : (acc[currAttr.name] || []).concat([currAttr])
  }), {});

}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getSelectedVariant = (attribs) :any => {
  return attribs;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDescription(product: Product): string {
  return product.description;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCategoryIds(product: Product): string[] {
  return product.categoryId ? [product.categoryId] : [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(product: Product): string {
  return product.id;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStock(product: Product): number {
  return product.stock || 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return String(price);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalReviews(product: Product): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAverageRating(product: Product): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isInWishlist(product: Product): boolean {
  return false;
}

export const getBreadcrumbs = (product: Product) : AgnosticBreadcrumb[] => {
  const breadcrumbs = [
    {
      text: 'Home',
      link: '/'
    }
  ];

  if (product && product.category) {
    breadcrumbs.push({
      text: product.category.name,
      link: `/c/${product.category.name.toLocaleLowerCase()}-${product.category.categoryId}`
    });
  }

  if (product) {
    breadcrumbs.push({
      text: getName(product),
      link: `/p/${product.id}/${getSlug(product)}`
    });
  }

  return breadcrumbs;
};

export const productGetters: ProductGetters<Product, ProductFilter> = {
  getName,
  getSlug,
  getPrice,
  getGallery,
  getCoverImage,
  getFiltered,
  getAttributes,
  getDescription,
  getCategoryIds,
  getId,
  getStock,
  getFormattedPrice,
  getTotalReviews,
  getAverageRating,
  isInWishlist,
  getSelectedVariant,
  getBreadcrumbs
};
