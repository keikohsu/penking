<template>

<v-container fluid>
    <v-row class="FormPadding-users">
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            使用者名稱
          </th>
          <th class="text-left">
            E-mail
          </th>
          <th class="text-left">
            電話
          </th>
          <th class="text-left">
            按鈕
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, idx) in items"
          :key="item._id"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.account }}</td>
          <td>
          <v-text-field v-if="item.edit" v-model="item.modelPhone"> </v-text-field>
          <p v-else>{{ item.phone }}</p>
          </td>
          <td>
          <v-btn color="orange" v-if="item.edit" @click="cancel(item)"> 取消 </v-btn>
          <v-btn icon v-if="item.edit" @click="save(item)">保存<v-icon>mdi-checkbox-marked-circle-outline</v-icon></v-btn>
          <v-btn icon v-if="!item.edit" @click="edit(item)"><v-icon>mdi-border-color</v-icon></v-btn>
          <v-btn icon v-if="!item.edit" @click="del(item,idx)"><v-icon>mdi-delete</v-icon></v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </v-row>
</v-container>

</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    cancel (item) {
      item.edit = false
      item.model = item.title
      item.modelPhone = item.phone
    },
    save (item) {
      this.axios.patch(process.env.VUE_APP_API + '/users/' + item._id, {
        account: item.model,
        phone: item.modelPhone
      })
        .then(res => {
          if (res.data.success) {
            item.edit = false
            item.title = item.model
            item.phone = item.modelPhone
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
    edit (item) {
      item.edit = true
      item.model = item.title
      item.modelPhone = item.phone
    },
    del (item, idx) {
      this.axios.delete(process.env.VUE_APP_API + '/users/' + item._id)
        .then(res => {
          if (res.data.success) {
            this.items.splice(idx, 1)
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
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/users/user/')
      .then(res => {
        if (res.data.success) {
          this.items = res.data.result.map(item => {
            // .map() 可以運算陣列的每個值後產生新的陣列
            // 增改刪查
            item.title = item.name
            item.edit = false
            item.model = item.account
            // item.modelPhone = item.phone

            delete item.user
            delete item.description
            return item
          })
          console.log(this.items)
        } else {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: res.data.message
          })
        }
      })
      .catch(err => {
        console.log(err)
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
.userspt{
  padding-top: 150px;
}
</style>
