export type CategoriesMetadata = {
    queryCount: number;
    itemsCount: number;
}

export type Category = {
    categoryId: string;
    parentCategoryId: string,
    name: string,
    icon: string,
    isActive: boolean,
    createDate: string,
    updateDate: string,
    orderIndex: number,
    subCategories: Category[]
}

export type CategorySearchResult = {
    data: Category[];
    meta: CategoriesMetadata;
}
