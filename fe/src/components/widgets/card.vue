<template>
  <div class="whiteCard flex-row-between-center">
    <div class="leftImage" @click="handleGoToGoods">
      <div class="swiperText">
        <div class="swiperTitle limit-line-1">{{ info.title }}</div>
        <div class="swiperWords limit-line-1">{{ info.text }}</div>
      </div>
      <div class="img" :style="`background-size: cover;background-image: url(${info.image});background-position: center;`"></div>
    </div>
    <div class="goodsInfo" v-if="false">
      <div class="goodsInfoTop">
        <div class="goodsName" @click="handleGoToGoods">
          
        </div>

        <div class="goodsParams limit-line-1" style="margin-top: 8px;">
          <i class="el-icon-house"></i>
          <span>{{ info.text || 'Aquamarine' }}</span>
        </div>

        <div class="goodsParams limit-line-1">
          <i class="el-icon-time"></i>
          <span>{{
            info.publishedAt
              ? info.publishedAt
              : '2020'
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: {}
    }
  },

  methods: {
    handleGoToGoods() {
      this.$router.push({
        path: '/goods/' + this.info.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.whiteCard {
  width: calc(100% - 2px);
  margin: 0 1px;
  /* padding: 11px; */
  background: #fff;
  border: 1px solid #f3f3f3;
  overflow: hidden;
  border-radius: 4px;
  flex-wrap: nowrap;

  transition: all 0.3s;

  margin-top: 22px;
}

.whiteCard:hover {
  opacity: 0.8;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.leftImage {
  width: 100%;
  max-height: 600px;
  cursor: pointer;

  img, div.img {
    width: 100%;
    height: 600px;
    object-fit: cover;
  }

  .swiperText {
    width: calc(50% - 25px);
    border-radius: 4px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    max-height: 64px;
    overflow: hidden;
    padding: 11px;
    background: rgba(0,0,0,0.747);
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
}

.goodsInfo {
  // width: calc(100% - 200px);
  height: 200px;
  padding: 16px 22px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  color: #333;

  .goodsInfoTop {
    .goodsParams {
      color: #515a6e;
      font-size: 13px;

      line-height: 1.6;
    }

    .goodsName {
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }
  }

  .goodsInfoBottom {
    width: 100%;
    font-size: 13px;
    color: #515a6e;

    .goodsPrice {
      font-size: 20px;
      color: #13b9fc;
      font-weight: bold;
    }
  }
}
</style>
