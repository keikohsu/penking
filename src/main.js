import App from './App.vue'
import router from './router'
import store from './store'

import Vue from 'vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'
import Photoswipe from 'vue-pswipe'
import VueSlickCarousel from 'vue-slick-carousel'

import AOS from 'aos'
import 'aos/dist/aos.css'

import './style.css'

axios.defaults.withCredentials = true
Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)
Vue.use(Photoswipe)
Vue.use(VueSlickCarousel)

Vue.component('ImgInputer', ImgInputer)

new Vue({
  created() {
    AOS.init()
  },
  router,
  store,
  vuetify,
  VueSlickCarousel,
  render: h => h(App)
}).$mount('#app')
