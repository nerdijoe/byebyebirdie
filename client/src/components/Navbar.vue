<template>
  <div class="ui secondary  menu">

    <router-link
        to="/"
        class="ui item"
        
        exact
      >
        <img class="ui small image"src="../assets/logo_bbb.png">
    </router-link>

    <div class="right menu">



      <router-link
          v-if="!is_login"
          to="signin"
          class="ui item"
          active-class="active"
          exact
        >
          Sign in
      </router-link>

      <a class="ui item" v-if="is_login" @click="signOut">
        Sign out
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters({
    is_login: 'getLoginStatus'
  }),
  methods: {
    ...mapActions([
      'userSignout'
    ]),
    signOut() {
      console.log("signOut")
      this.userSignout()
    }
  }
}
</script>

<style scoped>
</style>
