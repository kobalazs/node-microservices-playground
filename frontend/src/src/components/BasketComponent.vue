<template>
  <div>
    <h1>Basket</h1>
    <ul v-if="products.length">
      <li v-for="item in items" :key="item.productId">
        {{ getProductNameById(item.productId) }}
        <input
          type="number"
          :value="item.count"
          @input="setCount($event, item)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'

export default {
  setup(props, context) {
    const items = computed(() => context.root.$store.state.basket.items)
    const products = computed(() => context.root.$store.state.catalog.products)

    context.root.$store.dispatch('basket/show')

    function getProductNameById(productId) {
      const product = products.value.find(product => product._id === productId)
      return product?.name || 'Loading...'
    }

    function setCount(event, item) {
      context.root.$store.dispatch(
        'basket/setItem',
        {
          productId: item.productId,
          count: parseInt(event.target.value)
        }
      )
    }

    return { getProductNameById, items, products, setCount }
  }
}
</script>