<template>
  <div class="indexCardContainer">
    <div @click="handleImgUpload" class="toysNav blue">
      <svg class="icon" aria-hidden="true" style="width: 44px;height: 44px;">
        <use xlink:href="#icon-wanju" />
      </svg>
      <span>上传图片</span>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>
        <el-input
          type="textarea"
          autosize
          placeholder="请输入标题"
          v-model="title">
        </el-input>
        <div style="margin: 20px 0;"></div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入描述"
          v-model="text">
        </el-input>
        <el-switch
          style="margin-top:22px"
          v-model="public"
          active-text="是"
          inactive-text="是否公开">
        </el-switch>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlePublish">确 定</el-button>
      </span>
    </el-dialog>
    <div style="color:#515a6e;font-size:12px;padding-left:1px">
      View this on <a href="https://github.com/authing/foto" target="_blank">Github</a>.
      <br>
      Powered by <a href="https://serverless.com" target="_blank">Serverless.com</a> and <a href="https://authing.cn" target="_blank">Authing.cn</a>.
      <br>
    </div>
  </div>
</template>

<script>
import Authing from 'authing-js-sdk'
import { mapGetters, mapActions } from 'vuex'
import axios from '../../utils/axios'

export default {
  data() {
    return {
      dialogVisible: false,
      public: true,
      title: '',
      text: '',
      photo: ''
    };
  },  
  computed: {
    ...mapGetters('api', [
      'userInfo',
      'globalData'
    ]),
  },
  methods: {
    ...mapActions('api', ['publishImage']), 

    async handleImgUpload () {
      const authing = new Authing({
        userPoolId: '5e55385492331b44f3d507c2'
      })
      
      authing.selectAvatarFile(async (avatarURL) => {
        this.photo = await authing._uploadAvatar({
          photo: avatarURL,
        })
        this.dialogVisible = true;
      })
    },

    handleClose () {

    },

    async handlePublish() {
      let res = await axios.post('gallery/', {
        title: this.title,
        text: this.text,
        _public: this.public,
        userId: this.userInfo.sub,
        image: this.photo.photo,
      })      
      if (res.status === 201 || res.status === 200) {
        this.$message({
          message: '发布成功',
          type: 'success'
        })
        this.dialogVisible = false
        setTimeout(() => {
          location.reload()
        }, 300)
      } else {
        this.$message.error('发布失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.indexCardContainer {
  width: 100%;
  overflow-x: hidden;

  .toysNav {
    width: 100%;
    height: 120px;
    border-radius: 4px;
    font-size: 28px;
    color: #fff;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;

    cursor: pointer;

    margin-bottom: 22px;

    span {
      margin-left: 4px;
      text-shadow: 0 1px 1px #fff;
    }
  }

  .toysNav:hover {
    opacity: 0.8;
  }

  .blue {
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  }

  .green {
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  }
}
</style>