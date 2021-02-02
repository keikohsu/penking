<template>
  <v-container>
    <!-- <p class="text-center pt-10">最新商品</p> -->
    <v-row class="d-flex background-card align-center">
      <v-col cols="12" lg="3" id="product_1" class="pa-8 pt-0">
        <p>近期瀏覽商品</p>
        <v-divider></v-divider>
        <v-col cols="7" sm="4" lg="12" class="d-flex flex-column-reverse">
          <v-card elevation="0" class="browse pa-3 ma-0" v-for="item in itemslook" :key="item.id">
            <v-img class="pr-1" :src="item.src"></v-img>
            <p class="d-flex justify-center pl-5 align-center">{{ item.title }}</p>
          </v-card>
        </v-col>
        <!-- <v-col cols="2"></v-col> -->
        <p class="pt-10">特價商品</p>
        <v-divider></v-divider>
        <v-col cols="7" sm="4" lg="12" class="d-flex flex-column-reverse">
          <v-card elevation="0" class="browse pa-3 ma-0" v-for="item in itemsSale" :key="item.id" v-bind:to="item.router">
            <v-img class="pr-1" :src="item.src"></v-img>
            <div>
              <p class="d-flex justify-center pl-5">{{ item.title }}</p>
              <span class="d-flex pr-7 pl-2 align-center justify-space-around">
                <span class="priceline pl-7 pr-3">{{ item.sale }}</span
                >{{ item.price }}</span
              >
            </div>
          </v-card>
        </v-col>
      </v-col>
      <v-col md="9" sm="3" class="pa-10" style="min-width: 350px;">
        <v-col>
          <p class="">推薦商品</p>
          <v-divider></v-divider>
          <v-col cols="12" sm="5" lg="4"  class="d-flex flex-sm-row m-0 m-3  flex-column-reverse">
            <v-card v-for="item in items" :key="item.id" class="pa-3 ma-3">
              <v-img class="p-10" :src="item.src"></v-img>
              <p>{{ item.title }}</p>
              <v-btn elevation="0" rounded small color="#f4c865" class="white--text" v-bind:to="item.router">more</v-btn>
            </v-card>
          </v-col>
        </v-col>
        <v-col>
          <p>最新商品</p>
          <v-divider></v-divider>
          <v-col cols="12"  sm="5" lg="4" class="d-flex flex-sm-row m-0 m-3  flex-column-reverse">
            <v-card v-for="item in itemsNew" :key="item.id" class="pa-3 ma-3">
              <v-img class="p-10" :src="item.src"></v-img>
              <p>{{ item.title }}</p>
              <v-btn elevation="0" rounded small color="#f4c865" class="white--text" v-bind:to="item.router">more</v-btn>
            </v-card>
          </v-col>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'image',
  data() {
    return {
      // 推薦商品
      items: [
        {
          src: './images/1160.jpg',
          id: '1',
          title: '入油筆 漂浮筆 Floating Pen 金 花物',
          router: '/Productpag1160'
        },
        {
          src: './images/1110.jpg',
          id: '2',
          title: '入油筆 漂浮筆 Floating Pen 金 鑽石',
          router: '/Productpag1110'
        },
        {
          src: './images/11229066355_1183439283.jpg',
          id: '3',
          title: '入油筆 漂浮筆 Floating Pen 金 金沙',
          router: '/Productpag1130'
        }
      ],
      // 最新商品
      itemsNew: [
        {
          src: './images/水晶筆PC24.jpg',
          id: '1',
          title: '水晶筆 Crystal Pen',
          router: '/ProductpagCP-24'
        },
        {
          src: './images/五色鋼筆.jpg',
          id: '2',
          title: '五色質感鋼筆',
          router: '/Productpag1017'
        },
        {
          src: './images/1100.jpg',
          id: '3',
          title: '五色璀璨入油筆 漂浮筆',
          router: '/Productpag1018'
        }
      ],
      // 最近瀏覽商品
      itemslook: [
        {
          src: './images/unnamed.jpg',
          id: '1',
          title: '環保紙管原子筆'
        },
        {
          src: './images/top1.jpg',
          id: '3',
          title: '水晶筆 筆王(淡香）'
        },
        {
          src: './images/20190406143016.jpg',
          id: '3',
          title: '高級皮革鋼珠筆'
        }
      ],
      // 特價商品
      itemsSale: [
        {
          src: './images/圓筒色鉛筆.jpg',
          id: '1',
          title: '圓筒色鉛筆 12色',
          price: '$ 25',
          sale: '$ 18',
          router: '/Productpag1002'
        },
        {
          src: './images/塑膠筆-2.jpg',
          id: '2',
          title: '好寫油性塑膠筆',
          price: '$ 5',
          sale: '$ 2',
          router: '/Productpag1015'
        },
        {
          src: './images/金屬鋼筆.jpg',
          id: '3',
          title: '質感金屬鋼珠筆',
          price: '$ 80',
          sale: '$ 50',
          router: '/Productpag1009'
        }
      ]
    }
  }
}
</script>

<style>
p {
  color: #5c7063;
}
.background-card {
  background: #fff;
  height: 100%;
  color: #5c7063;
  border-radius: 10px;
}
.browse .v-image {
  width: 50px;
  height: 70px;
}
.sale {
  padding-top: 20px;
}
#product_1 .v-card {
  display: flex;
}
.priceline {
  text-decoration: line-through;
  color: #d32f2f;
}
</style>
