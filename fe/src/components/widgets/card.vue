<template>
  <div v-if="info.id" class="whiteCard flex-row-between-center">
    <div class="leftImage" @click="handleGoToGoods">
      <img
        v-lazy="
          info.image ||
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1751639388,3517002205&fm=26&gp=0.jpg'
        "
      />
    </div>
    <div class="goodsInfo">
      <div class="goodsInfoTop">
        <div class="goodsName" @click="handleGoToGoods">
          {{ info.name || 'Aquamarine 未闻花名 1/8 面码 盛装ver' }}
        </div>

        <div class="goodsParams limit-line-1" style="margin-top: 8px;">
          <i class="el-icon-house"></i>
          <span>{{ info.vendor || 'Aquamarine' }}</span>
        </div>

        <div class="goodsParams limit-line-1">
          <i class="el-icon-place"> 中国</i>
          <span></span>
        </div>

        <div class="goodsParams limit-line-1">
          <i class="el-icon-suitcase"></i>
          <span>{{ info.material || '橡胶' }}</span>
        </div>

        <div class="goodsParams limit-line-1">
          <i class="el-icon-time"></i>
          <span>{{
            info.sale_time
              ? new Date(info.sale_time).getFullYear() + ' 年'
              : '2018'
          }}</span>
        </div>
      </div>

      <div class="goodsInfoBottom flex-row-end-center unselect">
        <span style="margin-top: 3px;margin-right: 6px;">价格 /</span>
        <div class="goodsPrice">{{ (info.price || 100) + ' 元' }}</div>
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
  width: 200px;
  height: 200px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.goodsInfo {
  width: calc(100% - 200px);
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
