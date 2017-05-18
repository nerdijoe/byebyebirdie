import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    message: "byebyebirdie"
  },
  getters: {
    getMessage(state) {
      return state.message
    }
  },
  mutations: {

  },
  actions: {

  }

}) // end of store

export default store
