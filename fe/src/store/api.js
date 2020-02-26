import axios from '../utils/axios'

function getDate(date) {
  return !date
    ? ''
    : new Date(date).getFullYear() +
        '-' +
        (new Date(date).getMonth() + 1) +
        '-' +
        new Date(date).getDate()
}

const state = {
  goodsList: [],
  VendorList: [],
  MateralList: [],
  userInfo: {},
  swiperList: [],
  globalData: {
    search: '', //搜索内容
    vendor: '', //厂商
    material: '' //材质
  },
  searchList: []
}

const getters = {
  goodsList: () => state.goodsList,
  VendorList: () => state.VendorList,
  MateralList: () => state.MateralList,
  userInfo: () => state.userInfo,
  swiperList: () => state.swiperList,
  globalData: () => state.globalData,
  searchList: () => state.searchList
}

const mutations = {
  checkIsLogin(state, that) {
    if (!state.userInfo.sub) {
      that.$message({
        message: '请先登录',
        type: 'success'
      })
      setTimeout(() => {
        that.$router.push({
          path: '/login'
        })
      }, 1000)
    }
  },

  initUserInfo(state) {
    const userInfo = localStorage.getItem('userInfo')
    state.userInfo = userInfo ? JSON.parse(userInfo) : {}
  },

  async publishImage(state, { title, text, image, userId, _public, cb }) {
    try {
      let res = await axios.post('gallery/', {
        title,
        text,
        image,
        userId,
        public: _public,
      })
      cb(res)
    } catch (err) {
      cb({
        status: JSON.stringify(err).indexOf('400') > -1 ? 400 : 500
      })
    }
  },

  async getGoodsList(state) {
    let res = await axios.get('gallery')
    if (res.status == 200) {
      let arr = res.data || []
      arr = arr.reverse()
      state.goodsList = arr
    }
  },

  setData(state, { key, val }) {
    state.globalData[key] = val
  },

  async getSearchList(state, { options, cb }) {
    let res = await axios.get('gallery/', {
      params: options
    })
    state.searchList = res.data
    console.log(state.searchList);
    cb(res)
  },

  clearSearchList(state) {
    state.searchList = []
  },

  async getGoodsDetail(state, { id, cb }) {
    let res = await axios.get('gallery/' + id)
    cb(res)
  },

  async getComment(state, { id, cb }) {
    let res = await axios.get('api/reviews', {
      params: {
        toy: id
      }
    })
    cb(res)
  },

  async addComment(state, { body, star, toy, user, cb }) {
    let res = await axios.post('api/reviews/', {
      body,
      star,
      toy,
      user
    })
    cb(res)
  }
}

const actions = {
  initUserInfo({ commit }) {
    commit('initUserInfo')
  },

  checkIsLogin({ commit }, that) {
    commit('checkIsLogin', that)
  },

  pulishImage({ commit }, options){
    commit('publishImage', options)
  },

  getGoodsList({ commit }) {
    commit('getGoodsList')
  },

  setData({ commit }, options) {
    commit('setData', options)
  },

  getSearchList({ commit }, options) {
    commit('getSearchList', options)
  },

  clearSearchList({ commit }) {
    commit('clearSearchList')
  },

  getGoodsDetail({ commit }, options) {
    commit('getGoodsDetail', options)
  },

  getComment({ commit }, options) {
    commit('getComment', options)
  },

  addComment({ commit }, options) {
    commit('addComment', options)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
