<template>
  <div class="home">
    <app-carousel></app-carousel>
    <!-- <app-news></app-news> -->
    <app-image-card></app-image-card>
    <app-product></app-product>
    <app-product-card></app-product-card>
    <app-card></app-card>
  </div>
</template>

<script>
import AppCarousel from '../components/AppCarousel.vue'
// import AppNews from '../components/AppNews'
import AppCard from '../components/AppCard'
import AppProduct from '../components/AppProduct'
import AppProductCard from '../components/AppProductCard'
import AppImageCard from '../components/AppImageCard'

export default {
  name: 'Home',
  components: {
    AppCarousel,
    // AppNews,
    AppCard,
    AppProduct,
    AppProductCard,
    AppImageCard
  }
}
</script>

<style>
/* body {
  background: red;
} */
</style>
