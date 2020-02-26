<template>
  <div class="loginForm">
    <el-page-header
      style="margin-bottom: 22px;"
      title="Foto"
      @back="handleChangeFormMethod"
      :content="loginModal ? '欢迎登录～' : '欢迎注册 Foto!'"
    ></el-page-header>

    <div v-if="loginModal" class="inputBox flex-center">
      <el-button
        type="primary"
        style="width: 75%;"
        @click="handleLogin"
      >使用 Authing 登录</el-button>
      <el-checkbox v-model="checked" style="margin-top: 44px;">
        我已阅读并同意
        <a
          class="normalLink"
          href="javascript: void(0)"
          @click="handleViewAgreement"
        >《用户协议与隐私策略》</a>
      </el-checkbox>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Loading } from "element-ui";
export default {
  data () {
    return {
      checked: true,
      loginModal: true,
      username: '',
      password: '',

      form: {
        username: '',
        password: '',
        repassword: ''
      }
    }
  },

  mounted () {

  },

  computed: {
    ...mapGetters('api', ['userInfo'])
  },

  methods: {
    ...mapActions('api', ['login', 'registerID']),
    handleChangeFormMethod () {
      this.loginModal = !this.loginModal
    },

    handleViewAgreement () {
      this.$alert('这里是协议说明😂', '用户协议')
    },

    handleRegister () {
      if (!this.form.username) {
        this.$message.error('请填写用户名')
        return
      }
      if (!this.form.password) {
        this.$message.error('请填写密码')
        return
      }
      if (!this.form.repassword) {
        this.$message.error('请重复填写密码')
        return
      }
      if (this.form.repassword && this.form.repassword != this.form.password) {
        this.$message.error('两次密码输入不一致')
        this.form.repassword = ''
        return
      }
      console.log({
        username: this.form.username,
        password: this.form.password
      })
      try {
        this.registerID({
          username: this.form.username,
          password: this.form.password,
          cb: res => {
            if (res.status == 201) {
              this.$message({
                message: '注册成功',
                type: 'success'
              })
              setTimeout(() => {
                this.$router.push({
                  path: '/'
                })
              }, 1000)
            } else if (res.status == 400) {
              this.$message({
                message: '账号已被注册',
                type: 'warning'
              })
            } else {
              this.$message.error('注册失败')
            }
          }
        })
      } finally {

      }

    },

    async handleLogin () {
      location.href = 'http://service-jcfrhof9-1259609921.sh.apigw.tencentcs.com/release/login/';
    }
  }
}
</script>

<style lang="scss" scoped>
.loginForm {
  width: 500px;
  min-height: 200px;
  border-radius: 4px;
  background: #fff;
  padding: 14px 18px;
}

.inputBox {
  width: 100%;
  height: 200px;
}

.flex-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.formInput {
  width: 75%;
  margin-bottom: 18px;
}

.el-form-item {
  margin-bottom: 2px;
}
</style>