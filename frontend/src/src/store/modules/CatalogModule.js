import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: []
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
    setProduct(state, payload) {
      const products = []
      state.products.forEach((product) => {
        products.push(product._id === payload._id ? payload : product)
      })
      state.products = products
    }
  },
  actions: {
    async loadProducts(context) {
      const response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/catalog/product`)
      context.commit('setProducts', response.data)
    }
  }
}
