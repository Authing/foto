<template>
  <div class="loginPage normalPage">
    <login-form />
  </div>
</template>

<script>
import loginForm from '@/components/widgets/loginForm'
export default {
  components: {
    loginForm
  }
}
</script>

<style scoped>
.loginPage {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>