<template>
  <div>
    <div>ID: {{ product._id }}</div>
    <div>Name: {{ product.name }}</div>
    <div>Price: {{ product.price }}</div>

    <span v-if="adding">Adding...</span>
    <span v-else>
      <input type="number" v-model="count" />
      <button @click="addToBasket">Add to Basket</button>
    </span>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  name: 'CatalogItemComponent',
  props: {
    product: Object
  },
  setup(props, context) {
    const adding = ref(false)
    const count = ref(1)

    async function addToBasket() {
      adding.value = true
      await context.root.$store.dispatch(
        'basket/addItem',
        {
          productId: props.product._id,
          count: parseInt(count.value)
        }
      )
      adding.value = false
    }

    return { adding, addToBasket, count }
  }
}
</script>