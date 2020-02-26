<template>
  <div id="app">
    <menu-bar />
    <router-view />
  </div>
</template>

<script>
import menuBar from '@/components/menu'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    menuBar
  },
  methods: {

    ...mapActions('api', [
      'initUserInfo'
    ])
  },

  mounted () {
    this.initUserInfo()
    window.onerror = err => {
      if (err.indexOf('null')) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
@import './utils/global.scss';

#app {
  font-family: 'PingFang SC', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
