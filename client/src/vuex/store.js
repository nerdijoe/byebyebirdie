import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import VueFire from 'vuefire'
import firebase from 'firebase'

Vue.use(Vuex, axios, VueFire, firebase)


var config = {
  apiKey: "AIzaSyA5qfMCJQY2hNWUfoqrCliwgNtm2nsoLUE",
  authDomain: "noobijoe.firebaseapp.com",
  databaseURL: "https://noobijoe.firebaseio.com",
  projectId: "noobijoe",
  storageBucket: "noobijoe.appspot.com",
  messagingSenderId: "252696857462"
};

var firebaseApp = firebase.initializeApp(config);
var db = firebaseApp.database()

const firebaseSecret= 'byebyebirdie'

function writePostData(secretKey, twit_id) {
  firebase.database().ref('twits/' + secretKey).set({
    twit_id: twit_id
  });
  console.log('----> firebase write')
}

const store = new Vuex.Store({
  state: {
    message: "byebyebirdie",
    user: {
      _id: '',
      name: '',
      username: ''
    },
    is_login: false,
    twits: [],
    tags: []
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
    clearLogin(state) {
      state.user = {_id: '', name: '', username: ''}
      state.is_login = false
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
    },
    updateTags(state) {
      console.log("here")
      state.twits.map( t => {
        t.tags.map( tag => {
          console.log(`*** ${tag}`)
          if(state.tags.length == 0) {
            var newTag = { tagname : `${tag}`, count: 1}
            state.tags.push(newTag)
          }
          else {
            var pos = state.tags.findIndex( t => t.tagname == tag)
            if(index != -1)
              state.tags[pos].count++
            else {
              var newTag = {tagname: `${tag}`, count: 1}
              state.tags.push(newTag)
            }

          }
        })
      })

      console.log("updateTags", state.tags)
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
    userSignout({commit}) {
      localStorage.removeItem('token');
      localStorage.removeItem('_id');
      localStorage.removeItem('name');
      localStorage.removeItem('username');

      commit('clearLogin')      
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

        writePostData(firebaseSecret, response.data._id)

      })
      .catch(err => {
        console.log(err)
      })
    },
    firebaseListen({dispatch}) {
      let self = this;
      var listenToPost = firebase.database().ref('twits/' + firebaseSecret );
      listenToPost.on('value', function(snapshot) {
        // updateStarCount(postElement, snapshot.val());
        console.log("listen: ", snapshot.val());
        // app.changes(snapshot.val().post_id);
        // self.listItems()
        // do something

        dispatch('fetchTwits')
        
        firebase.database().ref('twits/'+firebaseSecret).remove();

      });
    },
    updateTags({commit}) {
      commit('updateTags')
    }
  }

}) // end of store





export default store
