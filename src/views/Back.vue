<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" permanent color="blue-grey lighten-5" app>
      <v-sheet color="blue-grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="white" size="64">
          <img :src="'./images/penking-logo-yellow.png'" alt="John" />
        </v-avatar>
        <p>管理者</p>
      </v-sheet>

      <v-divider></v-divider>
      <!-- 下拉菜單------------------------------- -->
      <v-list v-for="item in items" :key="item.path">
        <v-list-group v-if="item.children" v-model="item.active" :prepend-icon="item.action" :index="item.path" no-action>
          <template v-slot:activator>
            <router-link class="navnoline" :to="item.path">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"> </v-list-item-title>
              </v-list-item-content>
            </router-link>
          </template>

          <router-link class="navnoline" v-for="(citem, cindex) in item.children" :to="citem.path" :key="cindex">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title v-text="citem.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>後台管理</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
      <router-link class="navnoline" to="/">
        <v-btn icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>
    <!-- 裡面內容 -->
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'head-nav',
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    logout() {
      this.axios
        .delete(process.env.VUE_APP_API + '/users/logout')
        .then(res => {
          // 如果登出成功
          if (res.data.success) {
            this.$swal({
              icon: 'success',
              title: '成功',
              text: '登出成功'
            })

            // 清除 vuex
            this.$store.commit('logout')

            // 導回首頁
            if (this.$route.path !== '/') {
              this.$router.push('/')
            }
          } else {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: res.data.message
            })
          }
        })
        .catch(error => {
          // 如果回來的狀態碼不是 200，直接 alert 錯誤訊息
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: error.response.data.message
          })
        })
    },
    heartbeat() {
      this.axios
        .get(process.env.VUE_APP_API + '/users/heartbeat')
        .then(res => {
          // 如果 vuex 是登入中
          if (this.user.id.length > 0) {
            // 但是後端沒登入
            if (!res.data) {
              this.$swal({
                icon: 'error',
                title: '錯誤',
                text: '登入時效已過'
              })
              // 登出
              this.$store.commit('logout')
              // 導回首頁
              if (this.$route.path !== '/') {
                this.$router.push('/')
              }
            }
          }
        })
        .catch(() => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '發生錯誤'
          })
          // 登出
          this.$store.commit('logout')
          // 導回首頁
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        })
    }
  },
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    // links: [
    //   ['mdi-inbox-arrow-down', '使用者管理'],
    //   ['mdi-send', '訂單管理'],
    //   ['mdi-delete', 'Trash'],
    //   ['mdi-alert-octagon', 'Spam']
    // ],
    items: [
      {
        action: 'mdi-briefcase',
        children: [{ path: 'push', title: '商品上架' }],
        title: '商品資訊',
        path: 'Back2'
      },
      {
        action: 'mdi-account-supervisor',
        active: true,
        children: [{ path: 'UserList', title: '總清單使用者' }],
        title: '會員管理',
        path: 'UserList'
      },
      {
        action: 'mdi-clipboard-text',
        children: [{ path: '/OrderForm', title: '訂單詳細資料' }],
        title: '訂單管理',
        path: 'CheckOrder'
      },
      {
        action: 'mdi-chat-processing',
        children: [{ path: '/ConnectionList', title: '訪客留言區' }],
        title: '留言管理',
        path: 'ConnectionList'
      }
    ]
  })
}
</script>

<style></style>
