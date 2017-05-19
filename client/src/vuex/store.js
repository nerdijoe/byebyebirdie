import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

const store = new Vuex.Store({
  state: {
    message: "byebyebirdie",
    user: {
      _id: '',
      name: '',
      username: ''
    },
    is_login: false,
    twits: []
  },
  getters: {
    getMessage(state) {
      return state.message
    },
    getLoginStatus(state) {
      return state.is_login
    },
    getUserInfo(state) {
      return state.user
    },
    getTwits(state) {
      return state.twits
    }
  },
  mutations: {
    setLoginStatus(state) {
      state.is_login = true
    },
    setUser(state, data) {
      state.user = data
      state.is_login = true
      console.log("mut setUser", state.user)
    },
    setUserfromLocalStorage(state) {
      state.user._id = localStorage._id
      state.user.name = localStorage.name
      state.user.username = localStorage.username
      state.token = localStorage.token

      state.is_login = true

      console.log('setUserfromLocalStorage', state.user);
    },
    setTwitsfromDB(state, data) {
      state.twits = data
    },
    addNewTwit(state, data) {
      state.twits.unshift(data)
    }
  }, // end of mutations
  actions: {
    userSignin({commit}, user) {
      axios.post('http://localhost:3000/api/users/signin', {
        username: user.username,
        password: user.password
      })
      .then( response => {
        console.log(`userSignin`)
        console.log(response.data)

        // set to localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('_id', response.data._id);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('username', response.data.username);

        console.log("token: ", localStorage.token)
        console.log("localStorage", localStorage)
        commit('setUser', response.data)
      })
      .catch( err => {
        console.log(err)
      })
    },
    checkLoginStatus({commit}, user) {
      // check localStorage
      // if exist, then set user info, etc
      console.log('checkLoginStatus')

      if(localStorage.token != null) {
        commit('setUserfromLocalStorage')
      }
    },
    fetchTwits({commit}) {

      axios.get('http://localhost:3000/api/twits')
      .then( response => {
        console.log("*** fetchTwits")
        console.log(response.data)

        commit('setTwitsfromDB', response.data)
      })
    },
    postTwit({commit}, twit) {
      console.log('postTwit')

      axios.post('http://localhost:3000/api/twits', {
        text: twit.text
      }, {
        headers: {token: localStorage.token}
      })
      .then(response => {
        console.log(response.data)
        commit('addNewTwit', response.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

}) // end of store

export default store
