<template>
  <v-container class="">
    <v-row class="FormPadding">
      <v-data-table :headers="headers" :items="orders" class="elevation-1 containerheight">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>會員訂購清單</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <template>
                  <!-- <tbody>
                    <tr v-for="order in orders" :key="order._id">
                      <td>
                        {{order.products[2].price}}
                      </td>
                    </tr>
                  </tbody> -->
                </template>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <!-- 跳出來視窗 編輯視窗 -->
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.price" label="Calories"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.quantity" label="Fat (g)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <!-- 符號 -->
        <template v-slot:item.product="{ item }">
          <p v-for="(product, index) in item.products" :key="index">1.{{ product.name }}</p>
        </template>
        <template v-slot:item.quantity="{ item }">
          <p v-for="(product, index) in item.products" :key="index">{{ product.quantity }}</p>
        </template>
        <template v-slot:item.price="{ item }">
          <p v-for="(product, index) in item.products" :key="index">{{ product.price }}</p>
        </template>
        <!-- <template v-slot:item.price="{ item }">
          <v-sheet class="pa-5">
            <v-switch v-model="switch1" inset :label="`Switch 1: ${switch1.toString()}`"></v-switch>
            <v-switch v-model="switch2" inset :label="`Switch 2: ${switch2.toString()}`"></v-switch>
          </v-sheet>
        </template> -->
        <template v-slot:item.actions="{ item }">
          <!-- <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon> -->
          <v-icon small @click="deleteItem(item, index)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => {
    return {
      dialog: false,
      dialogDelete: false,
      orders: [],
      name: '',
      price: '',
      id: '',
      quantity: '',
      headers: [
        {
          text: '訂購人',
          align: 'start',
          sortable: false,
          value: 'user'
        },
        {
          text: '商品',
          value: 'product'
        },
        {
          text: '訂購價格',
          value: 'price'
        },
        {
          text: '商品數量',
          value: 'quantity'
        },
        {
          text: '狀態',
          value: 'what',
          switch1: true,
          switch2: false
        },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        price: 0,
        quantity: 0
      },
      defaultItem: {
        name: '',
        price: 0,
        quantity: 0
      }
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    orderitems() {
      // for (let i = 0; i < orders.length ; i++ )
      return this.orders
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.orders = []
    },

    // editItem(item) {
    //   this.editedIndex = this.desserts.indexOf(item)
    //   this.editedItem = Object.assign({}, item)
    //   this.dialog = true
    // },

    // deleteItem(item) {
    //   this.editedIndex = this.desserts.indexOf(item)
    //   this.editedItem = Object.assign({}, item)
    //   this.dialogDelete = true
    // },
    // deleteItemConfirm() {
    //   this.desserts.splice(this.editedIndex, 1)
    //   this.closeDelete()
    // },
    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.desserts[this.editedIndex], this.editedItem)
    //   } else {
    //     this.desserts.push(this.editedItem)
    //   }
    //   this.close()
    // },
    deleteItem(item, index) {
      console.log(process.env.VUE_APP_API + '/users/order/' + item._id)
      this.axios
        .delete(process.env.VUE_APP_API + '/users/order/' + item._id)
        .then(res => {
          if (res.data.success) {
            console.log(this.items)
            this.orders.splice(index, 1)
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
    }
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/users/user')
      .then(res => {
        if (res.data.success) {
          const arry = res.data.result
          for (let i = 0; i < arry.length; i++) {
            for (let j = 0; j < arry[i].orders.length; j++) {
              this.orders.push(arry[i].orders[j])
              arry[i].orders[j].user = arry[i].name
            }
            console.log(this.orders)
          }
          // .map(order => {
          // order.id = order._id
          // order.name = order.products.name
          // order.price = order.products.price
          // order.quantity = order.products.quantity
          // return order
          // })
          // console.log(this.orders[0].orders)
          // console.log(this.orders[1].orders)
          // console.log(this.orders[2].orders)
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
  }
}
</script>
<style>
.containerheight {
  width: 900px;
}
</style>
