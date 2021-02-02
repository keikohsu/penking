<template>
  <v-row class="d-flex justify-center pt-3">
    <!-- <div class="card">
    interval
    </div> -->
    <v-carousel style="width:100%" hide-delimiter-background hide-delimiters show-arrows-on-hover cycle mx-5>
      <v-carousel-item v-for="(slide, i) in slides" :key="i" :src="slide.src"> </v-carousel-item>
    </v-carousel>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      colors: ['warning', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4'],
      // src: request('../images/banner1pen.jpg'),
      slides: [
        {
          src: './images/banner9.jpg',
          title: '1'
        },
        {
          src: './images/banner1.png',
          title: '2'
        },
        {
          src: './images/banner2.jpg',
          title: '1'
        },
        {
          src: './images/banner3.jpg',
          title: '1'
        },
        {
          src: './images/banner7.jpg',
          title: '1'
        }
      ]
    }
  }
}
</script>

<style>
.card {
  background: #a5a773 !important;
  min-width: 100%;
  height: 50px;
  position: relative;
}
</style>
