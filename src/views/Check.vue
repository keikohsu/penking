<template>
  <v-container>
    <v-row class="background">
      <v-col>
        <div class="tabletop d-flex align-center pt-5 pl-5">
          <p class="text-h5 ">購物清單</p>
        </div>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step color="#EDBD38" :complete="e1 > 1" step="1">
              購物明細
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step color="#EDBD38" :complete="e1 > 2" step="2">
              資料填寫
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step color="#EDBD38" step="3">
              訂單完成
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <!-- 步驟一 -->
              <v-form @submit.prevent="productorder">
                <v-card class="mb-12" color="#fffff" height="500px">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            圖片
                          </th>
                          <th class="text-left">
                            商品名稱
                          </th>
                          <th class="text-left">
                            數量
                          </th>
                          <th class="text-left">
                            價格
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="baskets in products" :key="baskets.name">
                          <td><v-img :src="baskets.image" height="60px" width="60px"> </v-img></td>
                          <td>{{ baskets.name }}</td>
                          <td>{{ baskets.quantity }}</td>
                          <td>{{ baskets.price }}</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td>總共 (含運費)</td>
                          <td>{{ total }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card>
                <v-col class="d-flex justify-space-between">
                  <router-link to="/product/all" class="navnoline">
                    <v-btn text>
                      回前頁
                    </v-btn>
                  </router-link>
                  <v-btn text @click="e1 = 2">
                    無會員可填表單
                  </v-btn>
                  <v-btn color="#f4c865" type="submit" @click="e1 = 2">
                    下一步
                  </v-btn>
                </v-col>
              </v-form>
            </v-stepper-content>
            <v-form @submit.prevent="checkout">
              <v-stepper-content step="2">
                <!-- 步驟二 -->
                <v-card class="mb-12" height="100%">
                  <p>訂購人資料</p>
                  <v-row justify="space-around">
                    <v-col cols="12" md="5" class="py-5">
                      <v-text-field class="pb-5" v-model="name" label="姓名" placeholder="姓名" rounded outlined></v-text-field>
                      <v-text-field class="pb-5" v-model="cellphone" label="手機" placeholder="手機" rounded outlined></v-text-field>
                      <v-text-field class="pb-5" v-model="phone" label="電話" placeholder="電話號碼" rounded outlined></v-text-field>
                      <v-text-field v-model="email" label="電子信箱" placeholder="電子信箱" rounded outlined></v-text-field>
                    </v-col>
                    <!-- 分隔線 -->
                    <!-- <v-divider inset></v-divider> -->
                    <v-col cols="12" md="5">
                      <v-select v-model="delivery" :items="['超商取貨', '郵局寄件', '快遞']" label="選擇配送" outlined></v-select>
                      <v-text-field v-model="address" label="運送地址" placeholder="地址" filled dense></v-text-field>
                      <v-select v-model="cash" :items="['ATM匯款', '支票', '刷卡', '貨到付款']" label="選擇付款" outlined></v-select>
                      <v-select v-model="invoice" :items="['收據', '發票 統編', '三聯式發票']" label="選擇發票" outlined></v-select>
                      <v-text-field v-model="remark" label="統編" placeholder="備註" filled dense></v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
                <v-col class="d-flex justify-space-between">
                  <v-btn @click="e1 = 1" text>
                    上一步
                  </v-btn>
                  <v-btn color="#f4c865" class="text-color" @click="e1 = 3"  type="submit">
                    下一步
                  </v-btn>
                </v-col>
              </v-stepper-content>

              <v-stepper-content step="3">
                <!-- 步驟三 -->
                <v-card class="mb-12 d-flex align-center justify-center " color="" height="300px">
                  <p class="text-h5 ">訂單於20個工作天，為您出貨謝謝您!</p><br/>
                </v-card>
                <v-col class="d-flex justify-space-between">
                  <v-btn text @click="e1 = 2">
                    上一步
                  </v-btn>
                  <router-link class="navnoline" to="/">
                  <v-btn color="#f4c865">
                    回首頁
                  </v-btn>
                  </router-link>
                </v-col>
              </v-stepper-content>
            </v-form>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'check',
  data() {
    return {
      e1: 1,
      name: '',
      cellphone: '',
      phone: '',
      email: '',
      address: '',
      remark: '',
      delivery: '',
      cash: '',
      invoice: '',
      carts: []
      // one: {
      //   name: '',
      //   price: '',
      //   description: '',
      //   quantity: 1
      // }
    }
  },
  methods: {
    checkout() {
      this.axios
        .post(process.env.VUE_APP_API + '/order/', this.$data)
        .then(res => {
          if (res.data.success) {
            this.$swal({
              icon: 'success',
              title: '下單成功',
              text: '謝謝購買'
            })
            this.name = ''
            this.cellphone = ''
            this.phone = ''
            this.email = ''
            this.address = ''
            this.remark = ''
            this.delivery = ''
            this.cash = ''
            this.invoice = ''
            // console.log(res.data)
          } else {
            this.$swal({
              icon: 'error',
              title: '發生錯誤',
              text: res.data.message
            })
          }
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: '發生錯誤',
            text: err.response.data.message
          })
        })
    },
    productorder() {
      this.axios
        .post(process.env.VUE_APP_API + '/users/' + this.user.id, this.products)
        .then(res => {
          if (res.data.success) {
            this.$swal({
              icon: 'success',
              title: '填寫成功',
              text: '謝謝'
            })
            this.products.name = ''
            this.products.quantity = ''
            this.products.price = ''
            this.products.total = ''
          } else {
            this.$swal({
              icon: 'error',
              title: '發生錯誤',
              text: res.data.message
            })
          }
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: '請登入會員',
            text: err.response.data.message
          })
          console.log(err.response)
        })
    }
  },
  computed: {
    products() {
      return this.$store.getters.getBasketItems
    },
    total() {
      return this.$store.getters.total
    },
    user() {
      return this.$store.state.user
    }
  }
}
</script>

<style>
.background {
  border-radius: 10px;
  margin-top: 100px;
  height: 100%;
  margin-bottom: 300px;
  padding: 40px;
}

.tabletop {
  width: 100%;
  background: #bacec1;
  height: 90px;
}

.text-color {
  color: #fff;
}
</style>
