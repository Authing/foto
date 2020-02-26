<template>
  <div class="menuBar flex-row-start-center">
    <!-- LOGO -->

    <svg class="icon headerLogo" @click="handleRouteTo('/')">
      <use xlink:href="#icon-wolf" />
    </svg>

    <!-- 菜单 -->
    <div class="menuContainer">
      <el-menu
        :default-active="currentTab"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleRouteTo"
      >
        <el-menu-item index="/">主页</el-menu-item>
      </el-menu>
    </div>

    <div class="menuRightContainer flex-row-end-center">
      <el-dropdown>
        <router-link
          :to="userInfo.sub ? '/user' : '/login'"
          class="menuLink"
        >
          <i class="el-icon-user" style="margin-right: 4px;"></i>
          {{ userInfo.prefered_username || userInfo.nickname || '登录' }}
        </router-link>
        <el-dropdown-menu v-if="userInfo.sub" slot="dropdown">
          <router-link class="routerLink" to="/user">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <a
            class="routerLink"
            href="javascript: void(0)"
            @click="handleLoginOut"
          >
            <el-dropdown-item divided>退出</el-dropdown-item>
          </a>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      select: '',
      searchValue: '',
      currentTab: '/'
    }
  },

  watch: {
    searchValue(val) {
      if (!val) {
        this.clearSearchList()
      }
    }
  },

  computed: {
    ...mapGetters('api', [
      'VendorList',
      'MateralList',
      'userInfo',
      'globalData'
    ])
  },

  methods: {
    ...mapActions('api', ['setData', 'getSearchList', 'clearSearchList']),
    handleRouteTo(e) {
      if (e.indexOf('-') > -1) {
        this.$router.push({
          path: '/'
        })
        this.handleSelectChange(e)
        this.setData({
          key: 'search',
          val: ''
        })
        this.handleSubmitSearch()
      } else {
        this.$router.push({
          path: e
        })
      }
    },

    handleLoginOut() {
      localStorage.clear()
      document.cookie = ''
      location.reload()
    },

    handleSearchValueChange(e) {
      this.setData({
        key: 'search',
        val: e
      })
    },

    handleSelectChange(e) {
      if (e.indexOf('材质-') > -1) {
        this.setData({
          key: 'vendor',
          val: ''
        })
        this.setData({
          key: 'material',
          val: e.replace('材质-', '')
        })
      }
      if (e.indexOf('厂商-') > -1) {
        this.setData({
          key: 'material',
          val: ''
        })
        this.setData({
          key: 'vendor',
          val: e.replace('厂商-', '')
        })
      }
    },

    handleSubmitSearch() {
      this.getSearchList({
        options: this.globalData,
        cb: res => {
          if (!res.data.length) {
            this.$alert('未找到相关手办')
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.menuBar {
  width: 100%;
  max-height: 61px;
  overflow: hidden;
  background: #fff;

  padding: 0 44px;
  border-bottom: 1px solid #f3f3f3;
  position: fixed;
  top: 0;
  z-index: 999;
}

.headerLogo {
  width: 44px;
  height: 44px;
  display: inline-block;
  margin-right: 22px;
  cursor: pointer;
}

.menuContainer {
  flex-grow: 1;
}

.menuRightContainer {
  flex-grow: 1;
  height: 60px;
}

.menuLink {
  font-size: 14px;
  color: #909399;
  text-decoration-line: none;
  transition: all 0.3s;
}

.menuLink:hover {
  color: #303133;
}

.searchBar {
  width: 300px;
  margin-right: 28px;
}

.routerLink {
  text-decoration: none;
}
</style>
