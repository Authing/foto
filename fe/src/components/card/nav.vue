<template>
  <div class="indexCardContainer">
    <div @click="handleImgUpload" class="toysNav blue">
      <svg class="icon" aria-hidden="true" style="width: 44px;height: 44px;">
        <use xlink:href="#icon-wanju" />
      </svg>
      <span>上传图片</span>
    </div>
    <div style="color:#515a6e;font-size:12px;padding-left:1px">
      View this on <a href="https://github.com/authing/foto" target="_blank">Github</a>.
      <br>
      Powered by <a href="https://serverless.com" target="_blank">Serverless.com</a> and <a href="https://authing.cn" target="_blank">Authing.cn</a>.
      <br>
    </div>
  </div>
</template>

<script>
const Authing = require('authing-js-sdk');
export default {
  methods: {
    async handleImgUpload () {
      const authing = new Authing({
        userPoolId: '5e55385492331b44f3d507c2'
      });
      
      authing.selectAvatarFile((avatarURL) => {
        // avatarURL 即为头像地址（公网 URL）
        console.log(avatarURL);
      })
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