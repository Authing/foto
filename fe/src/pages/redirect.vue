<template>
  <div class="userPage normalPage">
    <p>ssss</p>
  </div>
</template>

<script>
import userForm from '@/components/widgets/user'
import { mapActions } from 'vuex'
export default {
  components: {
    userForm
  },

  methods: {
    ...mapActions('api', ['checkIsLogin', 'initUserInfo'])
  },

  mounted () {
    const query = this.$router.history.current.query
    localStorage.setItem('access_token', query.access_token)
    localStorage.setItem('id_token', query.id_token)    
    localStorage.setItem('userInfo', JSON.parse(query.user_info))
    this.initUserInfo()
    this.checkIsLogin(this)
    this.$router.push({
        path: '/'
    })
  }
}
</script>

<style scoped>
.userPage {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>