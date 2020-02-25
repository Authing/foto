<template>
  <div class="loginForm">
    <el-page-header
      style="margin-bottom: 22px;"
      :title="loginModal ? '注册' : '登录'"
      @back="handleChangeFormMethod"
      :content="loginModal ? '欢迎登录～' : '欢迎注册 Foto!'"
    ></el-page-header>

    <div v-if="loginModal" class="inputBox flex-center">
      <el-input
        class="formInput"
        style="margin-top: 22px;"
        placeholder="请输入用户名 / 昵称 / 手机号"
        prefix-icon="el-icon-user"
        v-model="username"
      ></el-input>

      <el-input
        class="formInput"
        placeholder="请输入密码"
        prefix-icon="el-icon-lock"
        type="password"
        v-model="password"
      ></el-input>
      <el-button
        type="primary"
        style="width: 75%;"
        :disabled="!checked || !username || !password"
        @click="handleLogin"
      >立即登录</el-button>
      <el-checkbox v-model="checked" style="margin-top: 44px;">
        我已阅读并同意
        <a
          class="normalLink"
          href="javascript: void(0)"
          @click="handleViewAgreement"
        >《用户协议与隐私策略》</a>
      </el-checkbox>
    </div>

    <div v-if="!loginModal" class="inputBox flex-center">
      <el-form ref="form" :model="form" style="width: 80%;margin: 0 10%;">
        <el-form-item label="昵称" required>
          <el-input v-model="form.username" placeholder="请输入用户名 / 昵称 / 手机号"></el-input>
        </el-form-item>

        <el-form-item label="密码" required>
          <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" required>
          <el-input type="password" v-model="form.repassword" placeholder="请重复密码"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="width: 80%;margin-top: 18px;" @click="handleRegister">立即注册</el-button>
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
      let loadCb = Loading.service({
        fullscreen: true
      })
      const resCb = res => {
        if (res['id']) {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          const that = this
          setTimeout(() => {
            that.$router.push({
              path: '/'
            })
          }, 1000)
        } else {
          this.$message({
            message: '登录失败',
            type: 'warning'
          })
        }
        loadCb.close()
      }
      this.login({
        username: this.username,
        password: this.password,
        cb: resCb
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.loginForm {
  width: 500px;
  min-height: 500px;
  border-radius: 4px;
  background: #fff;
  padding: 14px 18px;
}

.inputBox {
  width: 100%;
  height: 400px;
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