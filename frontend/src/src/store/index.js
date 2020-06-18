import Vue from 'vue'
import Vuex from 'vuex'
import CatalogModule from './modules/CatalogModule'
import BasketModule from './modules/BasketModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    basket: BasketModule,
    catalog: CatalogModule
  }
})
