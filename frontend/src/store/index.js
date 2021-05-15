import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const getDefaultState = () => {
  return {
    count: 0,
    updatedAt: null
  }
}

const state = getDefaultState()

const store = new Vuex.Store({
  state,
  getters: {
    count: state => state.count,
    updatedAt: state => state.updatedAt
  },
  mutations: {
    SET_COUNT(state, data) {
      state.count = data.count
      state.updatedAt = data.updatedAt
    }
  }
})

export default store
