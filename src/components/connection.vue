<template>
  <v-container class="py-15">
    <p class="text-center">需要商品諮詢或建議歡迎回饋給我們哦</p>
    <p class="text-center">penking@penking.com.tw</p>
    <v-form @submit.prevent="send" ref="form" class="content-bg">
      <p>聯絡表單</p>
      <v-row justify="space-between" class="background">
        <v-col cols="12" md="4">
          <v-text-field v-model="name" label="姓名"></v-text-field>
          <v-text-field v-model="company" label="公司名稱"></v-text-field>
          <v-text-field v-model="cellphone" label="手機"></v-text-field>
          <v-text-field v-model="phone" label="電話"></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="email" label="電子信箱"></v-text-field>
          <v-textarea v-model="message" counter label="傳送內容" :rules="rules"></v-textarea>
          <div class="d-flex justify-end">
            <v-btn class="mr-4" @click="clear">
              清除
            </v-btn>
            <v-btn type="submit">
              送出
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'news',
  data() {
    return {
      search: '',
      name: '',
      company: '',
      cellphone: '',
      phone: '',
      email: '',
      message: '',
      rules: [v => v.length <= 300 || 'Max 300 characters']
    }
  },
  methods: {
    send() {
      this.axios
        .post(process.env.VUE_APP_API + '/connection/', this.$data)
        .then(res => {
          if (res.data.success) {
            this.$swal({
              icon: 'success',
              title: '留言成功',
              text: '我們會盡快聯絡您~ 謝謝'
            })
            this.name = ''
            this.cellphone = ''
            this.company = ''
            this.phone = ''
            this.email = ''
            this.message = ''
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
    }
  }
}
</script>

<style>
.content-bg {
  padding: 40px;
  background: #ebe7d4;
  border-radius: 20px;
}
</style>
