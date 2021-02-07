<template>
  <v-container  class="d-flex justify-center pl-12">
    <!-- <p class="text-center pt-10">最新商品</p> -->
    <v-row class="justify-space-around py-15 mt-1">
      <v-col data-aos="zoom-in" data-aos-delay="300" sm="2">
        <router-link to="/Connection" class="navnoline">
        <v-img class="images1" :src="'./images/speech-bubble.png'" aspect-ratio="1" cols="3" sm="1"></v-img>
        <v-row
          ><v-col class="text-center" cols="12"><p class="pr-8 pt-2">回饋Q&A</p></v-col></v-row
        >
        </router-link>
      </v-col>
      <v-col data-aos="zoom-in" data-aos-delay="300" sm="2">
        <router-link to="/DescriptionBuy" class="navnoline">
        <v-img class="images1" :src="'./images/shopping-bag.png'" aspect-ratio="1" cols="3" sm="1"></v-img>
        <v-row
          ><v-col class="text-center" cols="12"><p class="pr-9 pt-2">購物須知</p></v-col></v-row
        >
        </router-link>
      </v-col>
      <v-col data-aos="zoom-in" data-aos-delay="300" sm="2">
        <router-link to="/About" class="navnoline">
          <v-img class="images1" :src="'./images/telemarketing.png'" aspect-ratio="1" cols="3" sm="1"></v-img>
          <v-row
            ><v-col class="text-center" cols="12"><p class="pr-8 pt-2">關於我們</p></v-col></v-row
          >
        </router-link>
      </v-col>
    </v-row>
    <!-- <v-row class="d-flex justify-content-between">
      <v-col v-for="item in items" :key="item.id" class="d-flex child-flex" cols="3">
        <v-img :src="item.src" aspect-ratio="1" class="grey lighten-2 ">
        </v-img>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
export default {
  name: 'image',
  data() {
    return {
      items: [
        {
          src: 'https://picsum.photos/500/300?image=1',
          id: '1',
          title: '鉛筆盒,鉛筆袋'
        },
        {
          src: 'https://picsum.photos/500/300?image=2',
          id: '2',
          title: '鉛筆盒,鉛筆袋'
        },
        {
          src: 'https://picsum.photos/500/300?image=3',
          id: '3',
          title: '鉛筆盒,鉛筆袋'
        }
      ]
    }
  }
}
</script>
<style>
.images1 {
  width: 80%;
}
</style>
