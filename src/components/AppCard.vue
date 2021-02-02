<template>
  <v-main>
    <v-container fluid class="backgroundcard">
      <VueSlickCarousel v-bind="settings" class="mx-3 ">
        <div><img class="a" :src="'./images/三色鋼珠筆.jpg'" /></div>
        <div><img :src="'./images/Lamy金屬筆.jpg'" /></div>
        <div><img :src="'./images/水晶筆PC24.jpg'" /></div>
        <div><img :src="'./images/20190406143016.jpg'" /></div>
        <div><img :src="'./images/考試用筆.jpg'" /></div>
        <div><img :src="'./images/皮筆.jpg'" /></div>
        <div><img :src="'./images/1100.jpg'" /></div>
        <div><img :src="'./images/1170.jpg'" /></div>
      </VueSlickCarousel>
      <!-- 500*400 -->
    </v-container>
  </v-main>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  components: { VueSlickCarousel },
  data() {
    return {
      settings: {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true
      }
    }
  }
}
</script>

<style>
.slick-slide {
  padding: 1rem;
}

.slick-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.backgroundcard {
  /* background: #f0f1ec !important; */
  padding: 0;
  height: 500px;
}
</style>
