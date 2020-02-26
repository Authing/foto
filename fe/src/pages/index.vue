<template>
  <div class="indexPage normalPage">
    <!-- 主页（三栏式） -->
    <el-row :gutter="22">
      <el-col :span="6">
        <div class="indexCellContainer">
          <user-card />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="indexCellContainer">
          <goods-card />
        </div>
      </el-col>

      <el-col :span="6">
        <div class="indexCellContainer">
          <nav-card />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userCard from '@/components/card/user'
import goodsCard from '@/components/card/goods'
import navCard from '@/components/card/nav'
import { mapActions } from 'vuex'

export default {
  components: {
    userCard,
    goodsCard,
    navCard
  },

  methods: {
    ...mapActions('api', ['getGoodsList'])
  },

  mounted() {
    this.getGoodsList()
  }
}
</script>

<style lang="scss" scoped>
.indexPage {
  width: 100%;
  overflow-x: hidden;

  padding: 0 44px;
  padding-top: calc(60px + 22px);
  padding-bottom: 22px;
  min-height: 100vh;
  background: #fafafa;
}

.indexCellContainer {
  width: 100%;
  overflow: hidden;
}
</style>
