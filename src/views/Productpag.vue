<template>
  <v-container class="pt-15">
    <v-container>
      <!-- 麵包屑 -->
      <!-- <div class="bread" style="background">
        <v-breadcrumbs  :items="divider">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </div> -->
      <v-row class="Productpag-mt justify-start">
        <v-col cols="12" md="1"></v-col>
        <!-- 左邊圖 -->
        <v-col cols="12" md="5">
          <Photoswipe>
            <v-col cols="12" class="pt-0">
              <p class="text-h6">{{ productdata.name }}</p>
            </v-col>
            <v-card max-width="500" max-height="500" align="center">
              <v-spacer></v-spacer>
              <img style="width:100%; height: 100%" id="product-img" :src="images[index]" v-pswp="images[index]" />
            </v-card>

            <!-- 小圖 -->
            <v-card class="small-imag-row small-img">
              <div class="small-imag-col d-flex flex-row pr-5 pl-4 justify-space-between">
                <img v-for="(image, index) in images" :key="image" :src="image" width="90" height="80" @click="change(index)" />
              </div>
              <!-- <div class="small-imag-col">
              <vue-images>
                <v-img
                  class="small-img"
                  src="https://www.montblanc.com/content/dam/rcq/mtb/20/36/93/8/2036938.png.adapt.750.750.png"
                  width="80"
                  height="80"
                ></v-img>
              </vue-images>
            </div> -->
            </v-card>
          </Photoswipe>
        </v-col>
        <!-- 右邊資訊 -->
        <v-col cols="12" md="5" class="py">
          <v-row justify="center">
            <v-row>
              <v-col cols="12" md="2" sm="1" class="px-5 ">
                <v-avatar color="#f4c865">
                  <v-icon dark>
                    mdi-robot
                  </v-icon>
                </v-avatar>
              </v-col>
              <v-col cols="12" md="10">
                <p>抽獎活動 <br />站內購物滿三千元，即可參加每月抽獎活動！</p>
              </v-col>
            </v-row>
            <v-col cols="12"><v-divider></v-divider></v-col>
            <v-row>
              <v-col cols="12" md="2" sm="5" class="px-5">
                <v-avatar color="#f4c865">
                  <v-icon dark>
                    mdi-dump-truck
                  </v-icon>
                </v-avatar>
              </v-col>
              <v-col cols="12" md="10">
                <p>免運活動 <br />站內購物滿499元，即可享有免運費!</p>
              </v-col>
            </v-row>
            <v-col cols="12"><v-divider></v-divider></v-col>
            <v-col cols="12" class="textcolor text-subtitle-2">
              類別: {{ productdata.sort }}<br />
              商品型號: {{ productdata.number }}<br />
              庫存量: {{ productdata.amount }}
            </v-col>
            <v-col cols="12"><v-divider></v-divider></v-col>
            <v-col
              ><p class="mb-2 text-h4">${{ productdata.price }}</p></v-col
            >
            <v-col cols="12"><v-divider></v-divider></v-col>
            <v-row class="pl-8 pt-5">
              <!-- <v-col sm="6" md="2"><p class="pt-3">數量</p></v-col> -->
              <v-col cols="12" sm="6" md="4" class="d-flex flex-row pl-5 align-center">
                <v-btn color="#f4c865" elevation="2" fab x-small text tile><v-icon color="white" @click="decreaseOtn()">mdi-minus</v-icon> </v-btn>
                <p class="pl-8 pr-8 pt-4 d-flex">{{ quantity }}</p>
                <!-- <v-text-field label="數量" solo dense></v-text-field> -->
                <v-btn class="d-flex align-center" color="#f4c865" elevation="2" fab x-small text tile
                  ><v-icon color="white" @click="increaseOtn()">mdi-plus</v-icon></v-btn
                >
                <v-col cols="12" class="d-flex pl-10">
                  <v-btn class="ma-2  cart-btn" outlined color="#657b6c" @click="addToBasket(productdata)">
                    加入購物車
                  </v-btn>
                </v-col>
              </v-col>
            </v-row>
            <!-- 下排按鈕 -->
            <!-- <v-btn class="ma-2" :loading="loading" :disabled="loading" color="secondary" @click="loader = 'loading'">
              Accept Terms
            </v-btn>
            <v-chip class="ma-2" close color="cyan" label text-color="white" href="https://www.tylee.tw/index.php?route=product/product&path=276&product_id=11150">
              <v-icon left>
                mdi-twitter
              </v-icon>
              New Tweets
            </v-chip> -->
          </v-row>
        </v-col>
        <v-col cols="12" md="2"></v-col>
      </v-row>
    </v-container>
    <!-- 標籤分頁 -->
    <v-row class="py-10">
      <v-col>
        <v-card>
          <v-tabs v-model="tab" background-color="transparent" color="#657b6c">
            <v-tab v-for="item in items" :key="item.tab">
              {{ item.tab }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat class="d-flex justify-center">
                <v-col cols="12" sm="7" class="text-center">
                  <v-card-text class="text-subtitle-1">{{ productdata.description }}</v-card-text>
                </v-col>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat class="d-flex justify-center">
                <v-col cols="12" sm="9" class="text-center">
                  <v-card-text class="text-subtitle-1"> {{ productdata.remarks }} </v-card-text>
                </v-col>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
    <apprecommend></apprecommend>
    <app-card></app-card>
  </v-container>
</template>

<script>
import Apprecommend from '../components/Apprecommend'
import AppCard from '../components/AppCard'
export default {
  components: {
    AppCard,
    Apprecommend
  },
  data() {
    var product = this.$route.params
    return {
      images: [],
      index: 0,
      productdata: {},
      tab: null,
      basketDump: [],
      product: {
        number: product.number
      },
      quantity: 0,
      items: [
        {
          tab: '內容簡介'
        },
        { tab: '規格說明', content: 'Tab 2 Content' }
      ],
      divider: [
        {
          text: '首頁',
          disabled: false,
          href: 'breadcrumbs_dashboard'
        },
        {
          text: '所有產品',
          disabled: false,
          href: '/product'
        },
        {
          text: '筆',
          disabled: true,
          href: 'breadcrumbs_link_2'
        }
      ]
    }
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/albums')
      .then(res => {
        if (res.data.success) {
          console.log(res.data)
          this.images = res.data.result
            // .map(image => {
            //   console.log(image)
            //   image.src = process.env.VUE_APP_API + '/albums/file/' + image.file
            //   return image
            // })
            // console.log(this.images)
            .filter(image => {
              // 一筆資料
              return image.number === this.product.number
            })
          this.productdata = this.images[0]
          this.quantity = 0
          this.images = this.productdata.files.map(image => {
            // console.log(image)
            image.src = process.env.VUE_APP_API + '/albums/file/' + image.file
            return image.src
          })
        } else {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: res.data.message
          })
        }
      })
      .catch(err => {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: err.response.data.message
        })
      })
  },
  methods: {
    addToBasket(image) {
      // 我改這裡productdata 原本是image
      this.basketDump.push({
        name: image.name,
        price: image.price,
        image: image.src,
        quantity: this.quantity
      })
      console.log(this.basketDump)
      this.$store.commit('addBasketItems', this.basketDump)
      this.basketDump = []
      // console.log(this.image)
    },
    increaseOtn() {
      this.quantity++
      // this.$store.commit('addBasket')
    },
    decreaseOtn() {
      this.quantity--
      if (this.quantity === 0) {
        this.basket.splice(this.basket.indexOf(this.productdata), 1)
      }
    },
    change(index) {
      this.index = index
    }
  },
  computed: {
    bigimg() {
      // console.log(this.images)
      return this.images[this.index]
      // images[index]
      // productImg[this.index]
    },
    basket() {
      // return this.$store.state.basketItems
      // 取得數據 可以使用該數據
      return this.$store.getters.getBasketItems
    },
    total() {
      return this.$store.getters.total
    }
  }
}
</script>

<style>
.Productpag-mt {
  padding-top: 25px;
  padding-bottom: 50px;
  border-radius: 20px;
  background: rgb(251, 252, 248);
}
.small-img {
  padding: 5px;
}

.small-imag-row {
  display: flex;
  justify-content: space-around;
  background: #9e8b49;
  margin-top: 25px;
}
.small-imag-col {
  flex-basis: 24%;
  cursor: pointer;
}
.bread {
  /* background: #9e8b49; */
  padding-top: 25px;
  padding-left: 150px;
}
.py {
  padding-top: 90px;
}
.cart-btn {
  width: 180px;
}
.textcolor {
  color: #657b6c;
}
</style>
