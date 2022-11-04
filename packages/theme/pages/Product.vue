<template>
  <div id="product">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="product">
      <LazyHydrate when-idle>
        <SfGallery
          :images="productGallery"
          class="product__gallery"
          :image-width="422"
          :image-height="664"
          :thumb-width="160"
          :thumb-height="160"
          :enableZoom="true"
          :outsideZoom="false"
          :sliderOptions='{"autoplay":3000,"rewind":true,"gap":0}'
        />
      </LazyHydrate>

      <div class="product__info">
        <div class="product__header">
          <SfHeading
            :title="productGetters.getName(product)"
            :level="3"
            class="sf-heading--no-underline sf-heading--left"
          />
          <SfIcon
            icon="drag"
            size="xxl"
            color="var(--c-text-disabled)"
            class="product__drag-icon smartphone-only"
          />
        </div>
        <div class="product__price-and-rating">
          <SfPrice
            :regular="$n(productGetters.getPrice(product).regular, 'currency')"
            :special="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
          />
          <div>
            <div class="product__rating">
              <SfRating
                :score="averageRating"
                :max="5"
              />
              <a v-if="!!totalReviews" href="#" class="product__count">
                ({{ totalReviews }})
              </a>
            </div>
            <SfButton class="sf-button--text">{{ $t('Read all reviews') }}</SfButton>
          </div>
        </div>
        <div>
        <div
            v-if="options && Object.keys(options).length > 0"
            class="product__variants"
          >
            <template v-for="(option, key) in options">
              <SfSelect
                :key="`attrib-${key}`"
                :data-cy="`product-select_${key.toLowerCase()}`"
                :set="(atttLbl = key)"
                :value="configuration[key] || options[key][0].value"
                :label="key"
                :class="`sf-select--underlined product__select-${key.toLowerCase()}`"
                :required="true"
                @input="(value) => updateFilter({ [key]: value })"
              >
                <SfSelectOption
                  v-for="(attribs, a) in option"
                  :key="`item-${a}`"
                  :value="attribs.value"
                >
                  {{ attribs.value }}
                </SfSelectOption>
              </SfSelect>
            </template>
          </div>

        <SfAddToCart
            v-e2e="'product_add-to-cart'"
            :stock="stock"
            v-model="qty"
            :disabled="loading"
            :canAddToCart="stock > 0"
            class="product__add-to-cart"
            @click="addItem({ product, quantity: parseInt(qty) })"
          />
        </div>

        <LazyHydrate when-idle>
          <SfTabs :open-tab="1" class="product__tabs">
            <SfTab :title="$t('pages.product.tab_title_description')" style="padding: 0; margin: 0">
              <div v-html="productGetters.getDescription(product)" class="product__description" ></div>
            </SfTab>
          </SfTabs>
        </LazyHydrate>
      </div>
    </div>

    <LazyHydrate when-visible>
      <RelatedProducts
        :products="relatedProducts"
        :loading="relatedLoading"
        title="Similar products"
      />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <InstagramFeed />
    </LazyHydrate>

  </div>
</template>
<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfAddToCart,
  SfTabs,
  SfGallery,
  SfIcon,
  SfImage,
  SfBanner,
  SfAlert,
  SfSticky,
  SfReview,
  SfBreadcrumbs,
  SfButton,
  SfColor
} from '@storefront-ui/vue';

import InstagramFeed from '~/components/InstagramFeed.vue';
import RelatedProducts from '~/components/RelatedProducts.vue';
import { ref, computed, useRoute, useRouter, useContext } from '@nuxtjs/composition-api';
import { useProduct, useCart, productGetters, useReview, reviewGetters } from '@vue-storefront/shopiroller';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import { addBasePath } from '@vue-storefront/core';

export default {
  name: 'Product',
  transition: 'fade',
  setup() {
    const qty = ref(1);
    const atttLbl = '';
    const route = useRoute();
    const router = useRouter();
    const context = useContext();
    const { products, search } = useProduct('products');
    const { products: relatedProducts, search: searchRelatedProducts, loading: relatedLoading } = useProduct('relatedProducts');
    const { addItem, loading } = useCart();

    // eslint-disable-next-line
    const { reviews: productReviews, search: searchReviews } = useReview('productReviews');
    const id = computed(() => route.value.params.id);
    const stock = computed(() => productGetters.getStock(products.value));
    const product = computed(() => productGetters.getFiltered(products.value, { master: true, attributes: route?.value?.query })[0]);
    const options = computed(() => productGetters.getAttributes(products.value));
    const configuration = computed(() => {
      return productGetters.getSelectedVariant(route?.value?.query);
    });
    const categories = computed(() => productGetters.getCategoryIds(product.value));
    const breadcrumbs = computed(() => productGetters.getBreadcrumbs(product.value).map(e => ({...e, link: context.localePath(e.link)})));
    const reviews = computed(() => reviewGetters.getItems(productReviews.value));

    const productGallery = computed(() => productGetters.getGallery(product.value).map(img => ({
      mobile: { url: addBasePath(img.small) },
      desktop: { url: addBasePath(img.normal) },
      big: { url: addBasePath(img.big) },
      alt: product.value.title
    })));

    onSSR(async () => {
      await search({ id: id.value, selectedOptions: configuration.value });
      await searchRelatedProducts({ categoryId: categories.value[0], limit: 8 });
      // await searchReviews({ productId: id.value });
    });

    const updateFilter = (filter) => {
      router.push({
        path: route?.value?.path,
        query: {
          ...configuration.value,
          ...filter
        }
      });
    };

    return {
      atttLbl,
      updateFilter,
      configuration,
      product,
      reviews,
      reviewGetters,
      averageRating: computed(() => productGetters.getAverageRating(product.value)),
      totalReviews: computed(() => productGetters.getTotalReviews(product.value)),
      relatedProducts: computed(() => productGetters.getFiltered(relatedProducts.value, { master: true })),
      relatedLoading,
      options,
      qty,
      stock,
      addItem,
      loading,
      productGetters,
      productGallery,
      breadcrumbs
    };
  },
  components: {
    SfAlert,
    SfColor,
    SfProperty,
    SfHeading,
    SfPrice,
    SfRating,
    SfSelect,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfIcon,
    SfImage,
    SfBanner,
    SfSticky,
    SfReview,
    SfBreadcrumbs,
    SfButton,
    InstagramFeed,
    RelatedProducts,
    LazyHydrate
  }

};
</script>

<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}
.product {
  @include for-desktop {
    display: flex;
  }
  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }
  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }
  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }
  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }
  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }
  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }
  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }
  &__compare {
    margin-top: 0;
  }
  &__tabs {
    --tabs-title-z-index: 0;
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__property {
    margin: var(--spacer-base) 0;
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }
  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }
  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );
    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);
      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }
    &__paragraph {
      margin: 0;
    }
  }
  &__gallery {
    flex: 1;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
