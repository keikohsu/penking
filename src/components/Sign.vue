<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon dark v-bind="attrs" v-on="on">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-form @submit.prevent="onSubmit" @reset="onReset">
        <v-card color="#F4F2E8">
          <v-card-title>
            <span class="headline field-text-white">會員註冊</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="name" label="姓名" required></v-text-field>
                  <v-text-field v-model="account" label="信箱" required :state="accountState"></v-text-field>
                  <v-text-field v-model="phone" label="電話" required></v-text-field>
                  <v-text-field v-model="password" label="密碼" type="password" required :state="passwordState"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <!-- <small>*indicates required field</small> -->
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  type="reset" color="#f4c865">
              清除
            </v-btn>
            <v-btn class="mr-4" type="submit" color="#f4c865">
              註冊
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'Reg',
  data() {
    return {
      dialog: false,
      name: '',
      account: '',
      password: '',
      phone: ''
    }
  },
  computed: {
    accountState() {
      if (this.account.length === 0) {
        return null
      } else if (this.account.length >= 4 && this.account.length <= 20) {
        return true
      } else {
        return false
      }
    },
    passwordState() {
      if (this.password.length === 0) {
        return null
      } else if (this.password.length >= 4 && this.password.length <= 20) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    onSubmit() {
      // 如果帳號密碼驗證通過
      if (this.accountState && this.passwordState) {
        this.axios
          .post(process.env.VUE_APP_API + '/users/', this.$data)
          .then(res => {
            if (res.data.success) {
              this.name = ''
              this.account = ''
              this.password = ''
              this.phone = ''
              this.$swal({
                icon: 'success',
                title: '註冊成功',
                text: '歡迎加入我們'
              }).then(() => {
                // sweet alert 對話框關掉後才跳到相簿頁
                this.$router.push('/')
              })
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
    },
    onReset() {
      this.name = ''
      this.account = ''
      this.password = ''
      this.phone = ''
    }
  }
}
</script>

<style>
</style>
