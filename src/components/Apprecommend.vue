<template>
  <v-container>
    <v-col>
      <p class=" text-h6">推薦商品</p>
      <v-divider></v-divider>
    </v-col>
    <v-row>
      <v-col cols="12" sm="4" class="cardpadding " v-for="card in cards" :key="card.id">
        <v-card class="" max-width="400" min-height="400">
          <router-link :to="card.id">
            <v-img class="white--text align-end" height="200px" style="width:100%; height: 100%" :src="card.src"> </v-img>
          </router-link>
          <v-card-title style="color:#657b6c">{{ card.title }}</v-card-title>

          <v-card-text class="text--primary">
            <div style="color:#657b6c">{{ card.content }}</div>
          </v-card-text>
          <v-card-actions style="color:#657b6c" class="pa-4">
            評價
            <v-spacer></v-spacer>
            <span class="grey--text text--lighten-2 caption mr-2"> ({{ card.rating }}) </span>
            <v-rating background-color="white" color="yellow accent-4" dense readonly half-increments hover :value="card.value" size="18"></v-rating>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      cards: [
        {
          src: './images/top1.jpg',
          id: '/Productpag1160',
          title: '漂浮筆 Floating Pen',
          rating: 5,
          value: 5,
          content: '質感筆身 金屬筆帽 最佳送禮禮品'
        },
        {
          src: './images/塑膠筆-2.jpg',
          id: '/Productpag1015',
          title: '多色塑膠筆',
          rating: 3.5,
          value: 3.5,
          content: '經典系列 原子筆'
        },
        {
          src: './images/工具筆.jpg',
          id: '/Productpag1005',
          title: '工具筆',
          rating: 4.5,
          value: 4.5,
          content: '筆身後可觸控手機螢幕 擁有量尺功能。'
        },
        {
          src: './images/unnamed.jpg',
          id: '/Productpag1014',
          title: '環保紙管原子筆',
          rating: 4.5,
          value: 4.5,
          content: '環保愛地球 本產品使用再生用紙，可以應刷商品字樣。'
        },
        {
          src: './images/鹿.jpg',
          id: '/Productpag1120',
          title: '漂浮筆 Floating Pen 金 鹿角',
          rating: 4.5,
          value: 4.5,
          content: '質感筆身 特殊造型 金屬筆帽 最佳送禮禮品。最佳送禮禮品。'
        },
        {
          src: './images/圓筒色鉛筆.jpg',
          id: '/Productpag1002',
          title: '圓筒色鉛筆 12色',
          rating: 4.5,
          value: 4.5,
          content: '色彩鮮明艷麗，不易褪色。 筆觸流暢且容易混色，描繪陰影、光暈效果佳。'
        }
      ]
    }
  }
  // methods: {
  //   mounted() {
  //     this.axios.get(process.env.VUE_APP_API + '/albums').then(res => {
  //       if (res.data.success) {
  //         this.items = res.data.result.map(item => {
  //           item.src = process.env.VUE_APP_API + '/albums/file/' + item.files[0].file
  //           return item
  //         })
  //         console.log(this.items)
  //       }
  //     })
  //   }
  // }
}
</script>

<style>
.cardpadding {
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>
