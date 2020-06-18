import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
    setItems(state, payload) {
      state.items = payload.map(item => ({ count: item.count, productId: item.product._id }))
    }
  },
  actions: {
    async addItem(context, payload) {
      const item = context.state.items.find(item => item.productId === payload.productId)
      const count = item?.count || 0
      await context.dispatch('setItem', {
        productId: payload.productId,
        count: count + payload.count
      })
    },
    async setItem(context, payload) {
      await axios.patch(
        `${process.env.VUE_APP_API_ENDPOINT}/basket/set-item`,
        payload
      )
      await context.dispatch('show')
    },
    async show(context) {
      const response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/basket/show`)
      context.commit('setItems', response.data)
      response.data.forEach((item) => {
        context.commit('catalog/setProduct', item.product, { root: true })
      })
    }
  }
}