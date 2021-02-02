<template>
  <div id="app">
    <!-- v-if="show" -->
    <!-- <router-view/> -->
    <keep-alive>
      <app-toolbar v-if="isShow"></app-toolbar>
    </keep-alive>
    <app-footer v-if="isShow"></app-footer>
    <back v-if="ShowOff"></back>
    <!-- <app-toolbar v-else="noshow"></app-toolbar>
  <app-footer vx-else="noshow"></app-footer> -->
  </div>
</template>

<script>
import AppToolbar from './components/AppToolbar.vue'
import AppFooter from './components/AppFooter.vue'
import back from './views/Back.vue'

export default {
  components: {
    AppToolbar,
    AppFooter,
    back
  },

  computed: {
    isShow() {
      if (this.$route.path === '/Back') {
        return false
      } else if (this.$route.path.includes('/push')) {
        return false
      } else if (this.$route.path.includes('/UserList')) {
        return false
      } else if (this.$route.path.includes('/CheckOrder')) {
        return false
      } else if (this.$route.path.includes('/Back2')) {
        return false
      } else if (this.$route.path.includes('/OrderForm')) {
        return false
      } else if (this.$route.path.includes('/ConnectionList')) {
        return false
      } else {
        return true
      }
    },
    ShowOff() {
      if (this.$route.path === '/Back') {
        return true
      } else if (this.$route.path.includes('/push')) {
        return true
      } else if (this.$route.path.includes('/UserList')) {
        return true
      } else if (this.$route.path.includes('/CheckOrder')) {
        return true
      } else if (this.$route.path.includes('/Back2')) {
        return true
      } else if (this.$route.path.includes('/OrderForm')) {
        return true
      } else if (this.$route.path.includes('/ConnectionList')) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
