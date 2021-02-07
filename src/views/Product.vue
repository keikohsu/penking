<template>
  <v-app id="inspire">
    <div class="img" :style="{ background: `url('./images/banner6.jpg')` }"></div>
    <!-- <div>
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div> -->
    <v-main>
      <v-container class="d-flex justify-center container py-15">
        <v-row style="100vh" justify-center align-center class="ProductBox" my-5>
          <!-- <v-col cols="12" md="1" style="background:blue"></v-col> -->
          <v-col v-for="(card, i) in filterDonate" cols="12" md="3" :key="i">
            <v-card>
              <v-hover v-slot="{ hover }">
                <router-link
                  v-bind:to="{
                    name: 'Productpag',
                    params: {
                      number: card.number
                    }
                  }"
                >
                  <v-img :src="card.src" :aspect-ratio="16 / 9" class="white--text align-end" gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0)" height="300px">
                    <v-expand-transition>
                      <div v-if="hover" class="d-flex transition-fast-in-fast-out blue-grey darken-4 v-cardreveal white--text" style="height:100%">
                        <v-card-title v-text="card.name"></v-card-title>
                        <p class=" pt-0 pb-0 mb-0">NT${{ card.price }}</p>
                      </div>
                    </v-expand-transition>
                  </v-img>
                </router-link>
              </v-hover>

              <v-card-actions>
                <v-row class="d-flex justify-center align-center pb-1 pl-lg-0 pl-0 pl-sm-7">
                  <v-col class="pb-0 pt-2 d-flex justify-center " cols="12"  sm="12"><p class="text-subtitle-1" v-text="card.name"></p></v-col>

                  <!-- <v-col class=" pb-12 pt-0 pr-0 pl-12">
                    <v-btn large icon @click="addToBasket(card), messages++"> </v-btn>
                  </v-col> -->
                  <v-row class="pb-2">
                    <v-col cols="12" class="pt-0 d-flex justify-center"
                      ><v-btn class="ma-2 d-flex justify-center" outlined color="#BACEC1" @click="addToBasket(card), messages++"
                        ><v-icon color="#f4c865">mdi-cart</v-icon>加入購物車
                      </v-btn></v-col
                    >
                  </v-row>
                </v-row>
                <v-spacer></v-spacer>
                <!-- 購物車小按鈕 -->
                <!-- <v-row style='background:red'>
                <v-col>
                <v-btn small text @click="addToBasket(card), messages++">
                  <v-icon color="orange">mdi-cart</v-icon>
                </v-btn>
                </v-col>
                </v-row> -->
              </v-card-actions>
            </v-card>
          </v-col>
          <!-- <v-col cols="12" md="1" style="background:blue"></v-col> -->
        </v-row>
      </v-container>

      <!-- 按鈕 -->
      <v-row justify="end" class="btn">
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#BACEC1" fab v-bind="attrs" v-on="on" class="btn">
              <v-badge :content="messages" :value="messages" overlap>
                <v-icon color="#657b6c">mdi-cart-variant</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <!-- 表格 -->
          <v-container>
            <v-col class="d-flex justify-end">
              <v-card class="table">
                <v-simple-table v-if="basket.length > 0">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          圖
                        </th>
                        <th class="text-left">
                          購買數量
                        </th>
                        <th class="text-left">
                          名稱
                        </th>
                        <th class="text-left">
                          價格
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="card in basket" :key="card.name">
                        <td>
                          <v-img height="40px" width="40px" :src="card.image"></v-img>
                        </td>
                        <td>
                          <v-icon color="orange" @click="increaseOtn(card)">mdi-plus</v-icon>
                          {{ card.quantity }}
                          <v-icon color="orange" @click="decreaseOtn(card)">mdi-minus</v-icon>
                        </td>
                        <td>{{ card.name }}</td>
                        <td>{{ card.price }}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-simple-table v-else>
                  <p>購物車很餓 快下單餵它!</p>
                </v-simple-table>
                <v-divider></v-divider>
                <v-row id="basket_checkout" pt-4 style="margin:0;">
                  <v-col>
                    <p>小計:</p>
                    <p>運費:</p>
                    <p>總計:</p>
                  </v-col>
                  <v-col class="text-right">
                    <p>{{ subTotal }}</p>
                    <p>60</p>
                    <p>
                      <b>{{ total }}</b>
                    </p>
                  </v-col>
                </v-row>
                <v-row style="margin:0;">
                  <v-spacer></v-spacer>
                  <router-link class="navnoline" to="/Check">
                    <v-btn depressed elevation="2">我要結帳</v-btn>
                  </router-link>
                  <v-btn>清空</v-btn>
                </v-row>
              </v-card>
            </v-col>
          </v-container>
        </v-dialog>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      image: null,
      sort: '',
      number: '',
      name: '',
      price: '',
      remarks: '',
      amount: '',
      description: '',
      cards: [],
      productdata: {},
      dialog: false,
      page: 1,
      messages: 0,
      show: false,
      filter: this.$route.params.filter,

      // 麵包屑
      items: [
        {
          text: '首頁',
          disabled: false,
          href: 'breadcrumbs_dashboard'
        },
        {
          text: '首頁',
          disabled: false,
          href: 'breadcrumbs_link_1'
        },
        {
          text: '產品',
          disabled: true,
          href: 'breadcrumbs_link_2'
        }
      ],
      basketDump: []
    }
  },
  methods: {
    addToBasket(card) {
      // if (this.basket.find(cardInArray => card.name === cardInArray.name)) {
      //   card = this.basket.find(cardInArray => card.name === cardInArray.name)
      //   this.increaseOtn(card)
      // } else {
      //   this.basket.push({
      //     name: card.name,
      //     price: card.price,
      //     quantity: 1
      //   })
      // }
      // console.log(card.total)
      this.basketDump.push({
        name: card.name,
        price: card.price,
        image: card.src,
        quantity: 1
        // total: card.total
      })
      this.$store.commit('addBasketItems', this.basketDump)
      this.basketDump = []
    },
    increaseOtn(card) {
      card.quantity++
      // this.$store.commit('addBasket')
    },
    decreaseOtn(card) {
      card.quantity--
      if (card.quantity === 0) {
        this.basket.splice(this.basket.indexOf(card), 1)
      }
    }
  },
  mounted() {
    this.axios.get(process.env.VUE_APP_API + '/albums').then(res => {
      if (res.data.success) {
        this.cards = res.data.result.map(card => {
          if (card.files.length > 0) {
            card.src = process.env.VUE_APP_API + '/albums/file/' + card.files[0].file
          } else {
            card.src = process.env.VUE_APP_API + '/albums/file/' + card.file
          }
          return card
        })
        console.log(this.cards)
      }
    })
  },
  clear() {
    this.name = ''
    this.price = ''
    this.src = ''
    this.quantity = ''
  },
  computed: {
    basket() {
      // return this.$store.state.basketItems
      // 取得數據 可以使用該數據
      return this.$store.getters.getBasketItems
    },
    subTotal() {
      var subCost = 0
      for (var cards in this.basket) {
        var individualItem = this.basket[cards]
        subCost += individualItem.quantity * individualItem.price
      }
      return subCost
      // return this.$store.state.basketItems
    },
    total() {
      var deliveryPrice = 60
      var totalCost = this.subTotal
      return totalCost + deliveryPrice
      // this.$store.commit('addBasket')
    },
    filterDonate() {
      return this.cards.filter(card => {
        if (this.filter === 'all') {
          return card
        } else {
          return card.sort === this.filter
        }
      })
    }
  }
}
</script>

<style>
.ProductBox {
  padding-bottom: 100px;
}

.v-cardreveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
.height {
  height: 100vh;
  width: 70%;
}
#basket_checkout {
  font-size: 13px;
}
#basket_checkout p:first-child {
  line-height: 50px;
}
.img {
  width: 100%;
  height: 350px;
  /* background-imge:url('/images/Product-blue.jpg') */
}
.table {
  width: 600px;
  padding: 30px;
}

.btn {
  position: fixed;
  top: 90%;
  right: 20px;
}
</style>
