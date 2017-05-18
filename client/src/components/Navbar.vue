<template>
  <div class="ui secondary  menu">
    <router-link
        to="/"
        class="ui item"
        active-class="active"
        exact
      >
        Home
    </router-link>

    <a class="item">
      Friends
    </a>
    <div class="right menu">
      <div class="item">
        <div class="ui icon input">
          <input type="text" placeholder="Search...">
          <i class="search link icon"></i>
        </div>
      </div>

      <router-link
          v-if="!is_login"
          to="signin"
          class="ui item"
          active-class="active"
          exact
        >
          Sign in
      </router-link>


      <a class="ui item">
        Sign up
      </a>

      <a class="ui item" @click="signOut">
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
    signOut() {
      console.log("signOut")
      
    }
  }
}
</script>

<style scoped>
</style>
