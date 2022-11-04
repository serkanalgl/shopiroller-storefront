import { AgnosticGroupedFacet } from '@vue-storefront/core';
import { Category } from './category';

export type ProductVariation = {
    id: string;
    value: string;
}

export type ProductVariationGroups = {
    id: string;
    name: string;
    isActive: boolean,
    variations: ProductVariation[]
}

export type ProductVariantData = {
    variationGroupId: string;
    variationId: string;
    value: string;
}

export type FeaturedImage = {
    t: string;
    n: string;
}

export type Image = {
    t: string;
    n: string;
}

export type ProductSearchMetadata = {
    queryCount: number;
    itemsCount: number;
    facets: AgnosticGroupedFacet[];
}

export type Product = {
    id: string;
    appId: string,
    categoryId: string,
    category: Category,
    isUnLimitedStock: boolean,
    title: string,
    description: string,
    stock: number,
    stockCode: string,
    price: number,
    campaignPrice: number,
    currency: string,
    useFixPrice: boolean,
    maxQuantityPerOrder: number,
    itemType: string,
    shippingPrice: number,
    orderIndex: number,
    isPublished: boolean,
    isActive: boolean,
    selectedVariant: Product,
    variantData: ProductVariantData[],
    variants: Product[],
    variationGroups: ProductVariationGroups[],
    images: Image[],
    featuredImage: FeaturedImage,
    publishmentDate: string,
    endDate: string,
    createDate: string,
    updateDate: string,
}

export type ProductSearchResult = {
    data: Product[];
    meta: ProductSearchMetadata;
}
