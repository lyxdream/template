import Vue from 'vue'
import Vuex from 'vuex'

import nav from './modules/nav'
import app from './modules/app'
// import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    nav,
    app,
    // user
  }
})
