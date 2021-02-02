<template>
  <v-container class="">
    <v-row class="FormPadding">
      <v-data-table :headers="headers" :items="orderitems" class="elevation-1 containerheight">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>訂單資料</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <!-- 左上按鈕 -->
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                  New Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }} </span>
                </v-card-title>

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

                <!-- 小表單按鈕 -->
                <!-- <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Save
                  </v-btn>
                </v-card-actions> -->
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <!-- 符號 -->
        <template v-slot:item.actions="{ item, index }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
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
          value: 'name'
        },
        {
          text: '手機',
          value: 'phone'
        },
        {
          text: '信箱',
          value: 'email'
        },
        {
          text: '寄送方式',
          value: 'delivery'
        },
        {
          text: '配送地址',
          value: 'address'
        },
        {
          text: '付款方式',
          value: 'cash'
        },
        {
          text: '發票',
          value: 'invoice'
        },
        {
          text: '統編備註',
          value: 'remark'
        },
        {
          text: '訂購日期',
          value: 'date'
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
    deleteItem(item, index) {
      this.axios
        .delete(process.env.VUE_APP_API + '/order/' + item._id)
        .then(res => {
          if (res.data.success) {
            this.orders.splice(index, 1)
            console.log(index)
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
      .get(process.env.VUE_APP_API + '/order/getorder')
      .then(res => {
        if (res.data.success) {
          this.orders = res.data.result
          console.log(this.orders)
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
  width: 100%;
}
</style>
