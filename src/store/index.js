import Vue from 'vue'
import Vuex from 'vuex'
import Persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

const getters = {
  user: state => state.user,
  getBasketItems: state => state.basketItems,
  total (state) {
    let total = 0
    state.basketItems.forEach(item => {
      total += item.price * item.quantity
    })
    return total + 60
  }
}

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      id: '',
      right: ''
    },
    push: {
      name: '',
      price: '',
      remarks: '',
      amount: '',
      description: ''
    },
    basketItems: [
    ]
  },
  mutations: {
    addBasketItems: (state, basketItem) => {
      const idx = state.basketItems.findIndex(item => item.name === basketItem[0].name)
      if (idx > -1) {
        state.basketItems[idx].quantity++
      } else {
        state.basketItems.push(basketItem[0])
      }
    },
    // addBasket (state, total) {
    //   state.basketItems.push(total)
    // },
    logout (state) {
      state.user.name = ''
      state.user.id = ''
      state.user.right = ''
    },
    login (state, data) {
      state.user.name = data.account
      state.user.id = data._id
      state.user.right = data.right
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [Persistedstate()],
  getters
})
