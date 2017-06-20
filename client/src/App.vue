<template>
  <div id="app">
    <div class="ui container">
      <navbar></navbar>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

import Navbar from './components/Navbar'

export default {
  name: 'app',
  components: {
    Navbar
  },
  methods: {
    ...mapActions([
      'checkLoginStatus',
      'fetchTwits',
      'firebaseListen',
      'updateTags'
    ])
  },
  created() {
    this.checkLoginStatus()
    this.fetchTwits()
    // this.updateTags()

    this.firebaseListen()

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 5px;
}
</style>
