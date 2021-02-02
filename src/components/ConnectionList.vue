<template>
  <v-container>
    <v-row class="FormPadding">
      <v-col class="d-flex justify-center">
        <v-card>
          <v-card-title>
            訪客留言管理
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="messages" :search="search">
            <template v-slot:item.actions="{ item }">
              <!-- <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon> -->
              <v-icon small @click="deleteItem(item, index)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      search: '',
      messages: [],
      headers: [
        {
          text: '姓名',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: '公司名',
          value: 'company'
        },
        {
          text: '手機',
          value: 'cellphone'
        },
        {
          text: '電話',
          value: 'phone'
        },
        {
          text: '信箱',
          value: 'email'
        },
        {
          text: '訊息',
          value: 'message'
        },
        {
          text: '填寫日期',
          value: 'date'
        },
        { text: '刪除', value: 'actions', sortable: false }
      ]
    }
  },
  methods: {
    deleteItem(item, index) {
      this.axios
        .delete(process.env.VUE_APP_API + '/connection/' + item._id)
        .then(res => {
          if (res.data.success) {
            this.messages.splice(index, 1)
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
      .get(process.env.VUE_APP_API + '/connection/getorder')
      .then(res => {
        if (res.data.success) {
          this.messages = res.data.result
          console.log(this.messages)
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
