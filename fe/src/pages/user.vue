<template>
  <div class="userPage normalPage">
    <user-form />
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
    ...mapActions('api', ['checkIsLogin'])
  },

  mounted () {
    this.checkIsLogin(this)
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