<template>
  <!-- ID可以調被景色 class="overflow-hidden"-->
  <v-app id="inspire">
    <div>
      <v-col class="top d-flex align-center">
        <div class="d-flex justify-start align-center">
          <router-link class="nav " to="/Back">
            <v-btn v-if="user.right === true" text color="#fff">後台管理</v-btn>
          </router-link>
        </div>
        <v-row class="d-flex justify-end align-center">
          <div class=" login d-flex justify-end align-center">
            <login v-if="user.id.length === 0"></login>
          </div>
          <div class="logout d-flex justify-end align-center">
            <v-btn v-if="user.id.length > 0" @click="logout" icon><v-icon color="#fff">mdi-logout-variant</v-icon></v-btn>
          </div>
          <div class="sing d-flex justify-end align-center">
            <sign sign></sign>
          </div>
        </v-row>
        <div class="d-flex justify-end cart">
          <router-link class="nav" to="/check">
            <v-btn icon>
              <v-icon color="#fff">mdi-cart</v-icon>
            </v-btn>
          </router-link>
        </div>
      </v-col>
      <v-container>
        <v-row class="d-flex justify-center align-center">
          <v-col cols="2" class="d-flex justify-center">
            <router-link to="/">
              <v-img :src="'./images/penking-logo-yellow2.png'" sizes min-height="154px" min-width="160px"> </v-img>
            </router-link>
          </v-col>
          <v-col cols="auto"> </v-col>
        </v-row>
        <div class="canvas-open">
          <span class="icon_menu"></span>
        </div>
      </v-container>
      <div class="toolbarbackground" elevation="12">
        <v-container class="d-flex align-self-center hidden-xs side-column">
          <v-row elevation="10" class="nav justify-center toolbar align-center flex-row">
            <!-- active-class="deep-orange darken-4--text" -->
            <v-col cols="2" sm="2" class="pa-0 ma-0">
              <router-link class="nav nav-menu d-flex justify-center  ma-2" to="/">
                <v-btn text block large class="textcolor " style="color:#657b6c">首頁</v-btn>
              </router-link>
            </v-col>
            <v-col cols="2" sm="2">
              <v-menu offset-y rounded min-width="160px" light>
                <template v-slot:activator="{ on, attrs }">
                  <li class="nav nav-menu d-flex justify-center align-center">
                    <v-btn text block large v-bind="attrs" v-on="on" style="color:#657b6c">產品</v-btn>
                  </li>
                </template>
                <v-list >
                  <v-list-item>
                    <router-link class="nav nav-menu " to="/product/all"><btn style="color:#657b6c">全部產品</btn></router-link>
                  </v-list-item>
                  <v-list-item>
                    <router-link class="nav nav-menu " to="/product/自動鉛筆"><btn style="color:#657b6c">自動鉛筆</btn></router-link>
                  </v-list-item>
                  <v-list-item>
                    <router-link class="nav nav-menu" to="/product/鉛筆"><btn style="color:#657b6c">鉛筆</btn></router-link>
                  </v-list-item>
                  <v-list-item>
                    <router-link class="nav nav-menu" to="/product/色鉛筆"><btn style="color:#657b6c">色鉛筆</btn></router-link>
                  </v-list-item>
                  <v-list-item>
                    <router-link class="nav nav-menu" to="/product/鋼筆"><btn style="color:#657b6c">鋼筆</btn></router-link>
                  </v-list-item>
                  <v-list-item>
                    <router-link class="nav nav-menu" to="/product/鋼珠筆"><btn style="color:#657b6c">鋼珠筆</btn></router-link>
                  </v-list-item>
                  <v-list-item>
                    <router-link class="nav nav-menu" to="/product/塑膠筆"><btn style="color:#657b6c">塑膠筆</btn></router-link>
                  </v-list-item>
                  <v-list-item>
                    <router-link class="nav nav-menu" to="/product/多用筆"><btn style="color:#657b6c">多用筆</btn></router-link>
                  </v-list-item>
                  <v-list-item>
                    <router-link class="nav nav-menu" to="/product/沾水筆"><btn style="color:#657b6c">沾水筆</btn></router-link>
                  </v-list-item>
                  <v-list-item>
                    <router-link class="nav nav-menu" to="/product/原子筆"><btn style="color:#657b6c">原子筆</btn></router-link>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
            <v-col cols="2" sm="2" class="d-flex justify-center align-center">
              <v-menu offset-y rounded min-width="160px" light>
                <template v-slot:activator="{ on, attrs }">
                  <li class="nav nav-menu d-flex justify-center align-center">
                    <v-btn text block large v-bind="attrs" v-on="on"  style="color:#657b6c">獨特產品</v-btn>
                  </li>
                </template>
                <v-list>
                  <v-list-item>
                    <router-link class="nav nav-menu" to="/product/all"><btn style="color:#657b6c">全部產品</btn></router-link>
                  </v-list-item>
                  <v-list-item>
                    <router-link class="nav nav-menu" to="/product/獨特類"><btn style="color:#657b6c">獨特類</btn></router-link>
                  </v-list-item>
                  <v-list-item>
                    <router-link class="nav nav-menu" to="/product/水晶筆"><btn style="color:#657b6c">水晶筆</btn></router-link>
                  </v-list-item>
                  <v-list-item>
                    <router-link class="nav nav-menu" to="/product/漂浮筆"><btn style="color:#657b6c">入油筆/漂浮筆</btn></router-link>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
            <!-- <v-col cols="12" sm="2" class="d-flex justify-center align-center">
              <router-link class="nav nav-menu" to="/product/all2">
                <v-btn text block large class="textcolor">文具</v-btn>
              </router-link>
            </v-col> -->
            <v-col cols="2" sm="2" class="d-flex justify-center align-center">
              <router-link class="nav nav-menu" to="/Connection">
                <v-btn text block large class="d-flex justify-center" style="color:#657b6c">聯絡我們</v-btn>
              </router-link>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <!-- 選單列nav -->

    <v-main>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
  </v-app>
</template>

<script>
// 用 vue-axios所以才不用引入 import axios from 'axios'
import Sign from '../components/Sign.vue'
import Login from '../components/Login.vue'
export default {
  name: 'App',
  data: () => {
    return {
      // filter: '',
      // drawer: null,
      // admins: [
      //   ['Management', 'mdi-account-multiple-outline'],
      //   ['Settings', 'mdi-cog-outline']
      // ],
    }
  },
  components: {
    Sign,
    Login
  },
  computed: {
    user() {
      return this.$store.state.user
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
  mounted() {
    this.heartbeat()
    setInterval(() => {
      this.heartbeat()
    }, 5000)
  }
}
</script>
<style>
/* 刪除底線 */
.nav {
  text-decoration: none;
  color: #fff;
}
.position {
  position: relative;
}
.login {
  padding-right: 5px;
}
.sing {
  padding-right: 26px;
  padding-left: 20px;
}
.cart {
  padding-left: 0px;
  /* padding-right: 10px; */
}
.top {
  width: 100%;
  background: #bacec1;
  /* background: #94A7AE; */
  /* background:#C0A9BD; */
  height: 40px;
}
.toolbar {
  padding-bottom: 2px;
}
.toolbarbackground {
  display: flex;
  justify-content: center;
  background: #f6f4e8;
  height: 55px;
}
</style>
