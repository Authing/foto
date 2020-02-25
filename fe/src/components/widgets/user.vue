<template>
  <div class="userForm">
    <div class="titleBar">我的资料</div>
    <div class="infoContainer">
      <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="昵称" style="margin-top: 28px;">
          <el-input v-model="form.username" placeholder="请输入您的昵称"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="resource">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="出生日期">
          <el-date-picker
            type="date"
            placeholder="选择您的出生日期"
            v-model="form.birth_date"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="入坑时间">
          <el-date-picker
            type="date"
            placeholder="选择您的入坑时间"
            v-model="form.join_date"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="您的职业">
          <el-input v-model="form.job" placeholder="请输入您的职业"></el-input>
        </el-form-item>
      </el-form>

      <el-button type="primary" style="width: 100%;margin-top: 16px;" @click="handleSave">保存资料</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      labelPosition: 'left',
      form: {
        username: '',
        job: '',
        sex: 0,
        join_date: '',
        birth_date: ''
      }
    }
  },

  computed: {
    ...mapGetters('api', ['userInfo'])
  },

  mounted () {
    const info = this.userInfo
    this.form.username = info.username
    this.form.sex = (info.sex == 1 ? '男' : '女')
    this.form.birth_date = info.birth_date || ''
    this.form.join_date = info.join_date || ''
    this.form.job = info.job || ''
  },

  methods: {
    ...mapActions('api', ['editProfile']),
    handleSave () {
      if (!this.form.username) {
        this.$message({
          message: '请输入您的昵称',
          type: 'warning'
        })
        return
      }
      if (!this.form.birth_date) {
        this.$message({
          message: '选择出生年月',
          type: 'warning'
        })
        return
      }
      if (!this.form.join_date) {
        this.$message({
          message: '请选择入坑时间',
          type: 'warning'
        })
        return
      }
      if (!this.form.job) {
        this.$message({
          message: '请输入您的职业',
          type: 'warning'
        })
        return
      }
      this.editProfile({
        profile: this.form,
        cb: res => {
          if (res.status == 200) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '保存失败',
              type: 'warning'
            })
          }
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.userForm {
  width: 500px;
  min-height: 500px;
  border-radius: 4px;
  background: #fff;
  padding: 14px 18px;

  .titleBar {
    font-weight: bold;
  }

  .infoContainer {
    width: 100%;
    padding: 22px;
  }
}

.el-input--suffix .el-input__inner {
  width: 1000px !important;
}
</style>