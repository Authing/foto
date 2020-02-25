<template>
  <div class="indexCardContainer">
    <swiper />
    <div v-if="searchList && searchList.length > 0">
      <el-alert
        :title="'找到' + searchList.length + '件商品'"
        type="success"
        show-icon
        close-text="关闭搜索结果"
        style="margin-top: 22px;"
        @close="handleCloseSearch"
      >
      </el-alert>
      <white-card
        v-for="(item, index) in searchList"
        :key="index"
        :info="item"
      />
    </div>
    <div v-if="!searchList.length && goodsList">
      <white-card
        v-for="(item, index) in goodsList"
        :key="index"
        :info="item"
      />
    </div>
    <div v-if="!goodsList || goodsList.length == 0" class="noGoods">
      一件商品也没有，怎么可能？！
    </div>
  </div>
</template>

<script>
import swiper from '@/components/widgets/swiper'
import whiteCard from '@/components/widgets/card'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    swiper,
    whiteCard
  },

  computed: {
    ...mapGetters('api', ['goodsList', 'searchList'])
  },

  methods: {
    ...mapActions('api', ['clearSearchList']),
    handleCloseSearch() {
      this.clearSearchList()
    }
  }
}
</script>

<style lang="scss" scoped>
.indexCardContainer {
  width: 100%;
  // padding: 11px;
  overflow-x: hidden;
  // background: #fff;
}

.indexCardContainer {
  .image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .noGoods {
    width: 100%;
    font-size: 13px;
    color: #515a6e;
    text-align: center;
    margin-top: 11px;
  }
}
</style>
