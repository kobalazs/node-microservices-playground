<template>
  <div>
    <h1>Catalog</h1>
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li v-for="product in products" :key="product._id">
        <CatalogItemComponent :product="product" />
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, ref } from '@vue/composition-api'
import CatalogItemComponent from './CatalogItemComponent'

export default {
  components: {
    CatalogItemComponent
  },
  setup(props, context) {
    const loading = ref(false)
    const products = computed(() => context.root.$store.state.catalog.products)

    loading.value = true
    context.root.$store.dispatch('catalog/loadProducts').then(() => {
      loading.value = false
    })

    return { loading, products }
  }
}
</script>
