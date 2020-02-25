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
    if (!state.userInfo.id) {
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

  async getVendorList(state) {
    let res = await axios.get('api/vendors')
    if (res.status == 200) {
      state.VendorList = res.data
    }
  },

  async getMateralList(state) {
    let res = await axios.get('api/materas')
    if (res.status == 200) {
      state.MateralList = res.data
    }
  },

  async login(state, { username, password, cb }) {
    try {
      let res = await axios.post('api/core/login/', {
        username,
        password
      })
      if (res.status == 200) {
        state.userInfo = res.data
        localStorage.setItem('userInfo', JSON.stringify(res.data))
      } else {
        state.userInfo = {}
      }
      cb(state.userInfo)
    } catch (err) {
      cb({})
    }
  },

  async registerID(state, { username, password, cb }) {
    let info = {}
    try {
      let res = await axios.post('api/users/', {
        username,
        password
      })
      if (res.status == 201) {
        state.userInfo = res.data
        localStorage.setItem('userInfo', JSON.stringify(res.data))
      } else {
        alert(res.status)
        state.userInfo = {
          status: res.status || 500
        }
      }
      let cbData = state.userInfo
      cbData.status = res.status
      cb(cbData)
    } catch (err) {
      cb({
        status: JSON.stringify(err).indexOf('400') > -1 ? 400 : 500
      })
    }
  },

  async editProfile(state, { profile, cb }) {
    let pro = JSON.parse(JSON.stringify(profile))
    if (pro.sex) {
      pro.sex = pro.sex == '男' ? 1 : 0
    }
    if (pro.birth_date) {
      pro.birth_date = getDate(pro.birth_date)
    }
    if (pro.join_date) {
      pro.join_date = getDate(pro.join_date)
    }
    try {
      let res = await axios.patch('api/users/' + state.userInfo.id + '/', pro)
      if (res.status == 200) {
        state.userInfo = res.data
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        cb(res)
      } else {
        cb({
          status: 400
        })
      }
    } catch (err) {
      cb({
        status: 400
      })
    }
  },

  async getSwiperPicture(state) {
    let res = await axios.get('api/core/notice/')
    if (res.status == 200) {
      state.swiperList = res.data
    }
  },

  async getGoodsList(state) {
    let res = await axios.get('api/toys/')
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
    let res = await axios.get('api/toys/', {
      params: options
    })
    state.searchList = res.data
    cb(res)
  },

  clearSearchList(state) {
    state.searchList = []
  },

  async getGoodsDetail(state, { id, cb }) {
    let res = await axios.get('api/toys/' + id)
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

  getVendorList({ commit }) {
    commit('getVendorList')
  },

  getMateralList({ commit }) {
    commit('getMateralList')
  },

  login({ commit }, { username, password, cb }) {
    commit('login', { username, password, cb })
  },

  checkIsLogin({ commit }, that) {
    commit('checkIsLogin', that)
  },

  registerID({ commit }, { username, password, cb }) {
    commit('registerID', { username, password, cb })
  },

  editProfile({ commit }, { profile, cb }) {
    commit('editProfile', { profile, cb })
  },

  getSwiperPicture({ commit }) {
    commit('getSwiperPicture')
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
