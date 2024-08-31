import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import products from './modules/products'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      users: users,
      products: products,
      cart: cart
    }
})