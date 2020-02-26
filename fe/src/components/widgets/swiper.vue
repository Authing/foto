<template>
  <div class="swiperContainer">
    <el-carousel height="320px" indicator-position="none" :interval="5000">
      <el-carousel-item v-for="(item, index) in imgList" :key="index">
        <div class="swiperItem">
          <img class="swiperImage" v-lazy="item.image" draggable="false" />
          <div class="swiperText">
            <div class="swiperTitle limit-line-1">{{ item.title }}</div>
            <div class="swiperWords limit-line-1">{{ item.text }}</div>
          </div>
        </div>

        <!-- <div class="swiperBox" v-lazy:background-image="item.image"></div> -->
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      imgList: [
        {
          title: 'Hellsing 地狱之歌',
          text: 'HELLSING 是平野耕太的一部融合吸血鬼特务机关等要素的黑暗风格动作漫画，图创作于 2016 年 via ivy。',
          image: 'https://cdn.authing.cn/blog/20200226165824.png'
        },
        {
          title: '巨人',
          text: '图创作于 2016 年 via ivy。',
          image: 'https://cdn.authing.cn/blog/20200226165840.png'
        }
      ]
    }
  },

  computed: {
    ...mapGetters('api', ['swiperList'])
  }
}
</script>

<style lang="scss" scoped>
.swiperContainer {
  width: 100%;
  border-radius: 4px;
  overflow: hidden;

  .swiperImage {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiperBox {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .swiperText {
    width: 100%;
    min-height: 64px;
    overflow: hidden;
    padding: 11px;
    background: rgba(0, 0, 0, 0.747);
    color: #fff;
    position: absolute;
    z-index: 1;
    cursor: pointer;

    .swiperTitle {
      font-size: 16px;
      font-weight: bold;
    }

    .swiperWords {
      margin-top: 2px;
      font-size: 12px;
    }
  }

  .swiperItem {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>