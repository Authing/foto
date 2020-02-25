<template>
  <div class="swiperContainer">
    <el-carousel height="320px" indicator-position="none" :interval="5000">
      <el-carousel-item v-for="(item, index) in swiperList" :key="index">
        <div class="swiperItem">
          <img class="swiperImage" v-lazy="item.image" draggable="false" />
          <div class="swiperText">
            <div class="swiperTitle limit-line-1">{{ item.text }}</div>
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
      // imgList: [
      //   {
      //     title: '《未闻花名》女主面码手办',
      //     text: '《我们仍未知道那天所看见的花的名字》是由日本动画公司A-1 Pictures制作的原创电视动画，于2011年4月14日起在日本富士电视台的“noitaminA”节目播出，全11集。',
      //     image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573472019358&di=4f22f7917f83b6531aac71bf704f036b&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201501%2F23%2F20150123230935_SNFPh.jpeg'
      //   },
      //   {
      //     title: '本间芽衣子',
      //     text: '哈哈哈哈',
      //     image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573472019358&di=c227ebbbcacc15caab3c2fbfb8c7d90d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201708%2F03%2F20170803173228_LsBVW.jpeg'
      //   }
      // ]
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