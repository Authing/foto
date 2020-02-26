<template>
  <div class="indexCardBox">
    <div v-if="userInfo.id" class="indexCard">
      <div class="indexCardContainer" v-lazy:background-image="backgroundImage"></div>

      <div class="userInfoContainer">
        <img
          v-lazy="userInfo.avatar || 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573645627412&di=b1b7a78628e7b464607e9b650c6b5457&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201705%2F07%2F20170507160711_uU3Zy.jpeg'"
        />
        <div class="userInfo">
          <div class="username limit-line-1">
            <span>{{ userInfo.username || '佚名' }}</span>
            <i
              :class="'el-icon-' + (userInfo.sex === true || !userInfo.sex ? 'male' : 'female')"
              :style="'color:' + (userInfo.sex === true || !userInfo.sex ? '#3679ff;' : '#e900f3;')"
            />
          </div>
          <div class="userbrief limit-line-1">{{ userInfo.bio || '这货很懒，没有介绍～' }}</div>
        </div>
      </div>

      <div class="userDetail">
        <div class="userDetailItem flex-row-between-center">
          <span>年龄</span>
          <span
            style="color: gray"
          >{{ getAgeByBirthday(userInfo.birth_date) ? getAgeByBirthday(userInfo.birth_date) + '岁' : '未填写' }}</span>
        </div>

        <div class="userDetailItem flex-row-between-center">
          <span>职业</span>
          <span style="color: gray">{{ userInfo.job || '未知' }}</span>
        </div>

        <div class="userDetailItem flex-row-between-center">
          <span>入坑时间</span>
          <span style="color: gray">{{ userInfo.join_date ? getDate(userInfo.join_date) : '未知' }}</span>
        </div>

        <div class="userDetailItem flex-row-between-center">
          <span>注册时间</span>
          <span
            style="color: gray"
          >{{ userInfo.created_time ? getDate(userInfo.created_time) : '未知' }}</span>
        </div>

        <div class="userDetailItem flex-row-between-center">
          <span>上次登录</span>
          <span
            style="color: gray"
          >{{ userInfo.update_time ? getDate(userInfo.update_time) : '未知' }}</span>
        </div>
      </div>

      <div class="settingButton flex-row-center-center">
        <el-button
          plain
          size="mini"
          type="primary"
          icon="el-icon-setting"
          @click="handleViewProfile"
        >控制台</el-button>
        <el-button
          plain
          size="mini"
          type="warning"
          icon="el-icon-star-off"
          @click="handleViewWaiting"
        >喜欢的</el-button>
        <el-button
          plain
          size="mini"
          type="danger"
          icon="el-icon-goods"
          @click="handleViewWaiting"
        >购物车</el-button>
      </div>
    </div>

    <div v-else class="indexCard unLogin">
      <svg class="icon" aria-hidden="true" style="width: 80%;height: 200px;">
        <use xlink:href="#icon-weidenglu" />
      </svg>

      <el-button plain type="primary" icon="el-icon-user" @click="handleGoLogin">立即登录</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      backgroundImage: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573579489940&di=0f0453698396ed0f2a9c8710d542d8de&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201507%2F01%2F20150701231450_3jNSM.jpeg'
    }
  },

  computed: {
    ...mapGetters('api', ['userInfo'])
  },

  methods: {
    handleViewWaiting () {
      this.$alert('施工中，敬请期待～', '温馨提示')
    },

    handleGoLogin () {
      location.href = 'http://service-jcfrhof9-1259609921.sh.apigw.tencentcs.com/release/login/';
    },

    handleViewProfile () {
      this.$router.push({
        path: '/user'
      })
    },

    getAgeByBirthday (date) {
      return !date ? false : parseInt((new Date().valueOf() - new Date(date).valueOf()) / 31536000000) + 1
    },

    getDate (date) {
      return !date ? false : new Date(date).getFullYear() + '-' + (new Date(date).getMonth() + 1) + '-' + new Date(date).getDate()
    }
  }
}
</script>

<style lang="scss" scoped>
.indexCardBox {
  width: 100%;
}

.unLogin {
  padding: 18px 11px;
  padding-bottom: 33px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.indexCard {
  width: 100%;
  background: #fff;
  overflow: hidden;
  border-radius: 5px;
}

.indexCardContainer {
  width: 100%;
  height: 180px;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.userInfoBackgroundImage {
  width: 100%;
  height: 180px;
  object-fit: cover;
  opacity: 0.6;
}

.userInfoContainer {
  width: calc(100% - 22px);
  margin: 0 11px;
  padding: 11px 0;
  z-index: 1;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid #f3f3f3;

  transform: translate(0, -30px);

  img {
    width: 80px;
    height: 80px;

    margin-right: 12px;

    object-fit: cover;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.6);
  }

  .userInfo {
    margin-top: 30px;
    line-height: 1.6;

    .username {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }

    .userbrief {
      font-size: 12px;
      color: #515a6e;
    }
  }
}

.userDetail {
  width: 100%;
  padding: 0 11px;
  transform: translate(0, -28px);

  .userDetailItem {
    font-size: 12px;
    padding: 8px 0;
    color: #515a6e;
    border-bottom: 1px dashed #f3f3f3;
  }
}

.settingButton {
  width: 100%;
  padding: 0 11px;
  transform: translate(0, -14px);

  button {
    margin: 0 8px;
  }
}
</style>