<template>
  <div class="sf-header__navigation desktop" v-if="!isMobile">
    <SfHeaderNavigationItem
      v-for="(category, index) in categories"
      :key="index"
      class="nav-item"
      v-e2e="`app-header-url_${categoryGetters.getName(category)}`"
      :label="categoryGetters.getName(category)"
      :link="localePath(`/c/${categoryGetters.getSlug(category)}`)"
    />
  </div>
  <SfModal v-else :visible="isMobileMenuOpen">
    <SfHeaderNavigationItem
      v-for="(category, index) in categories"
      :key="index"
      class="nav-item"
      v-e2e="`app-header-url_${index}`"
    >
      <template #mobile-navigation-item>
        <SfMenuItem
          :label="categoryGetters.getName(category)"
          class="sf-header-navigation-item__menu-item"
          :link="localePath(`/c/${categoryGetters.getSlug(category)}`)"
          @click="toggleMobileMenu"
        />
      </template>
    </SfHeaderNavigationItem>
  </SfModal>
</template>

<script>
import { SfMenuItem, SfModal } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useCategory, categoryGetters } from '@vue-storefront/shopiroller';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'HeaderNavigation',
  components: {
    SfMenuItem,
    SfModal
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const { search, categories } = useCategory('categories');

    onSSR(async () => {
      await search({});
    });

    return {
      categories,
      isMobileMenuOpen,
      toggleMobileMenu,
      categoryGetters
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-header-navigation-item {
  ::v-deep &__item--mobile {
    display: block;
  }
}
.sf-modal {
  ::v-deep &__bar {
    display: none;
  }
  ::v-deep &__content {
    padding: var(--modal-content-padding, var(--spacer-base) 0);
  }
}
</style>
