<template>
  <div class="signin-container">

  <div class="ui one column stackable center aligned page grid">
     <div class="column twelve wide">
       <h1> Sign in</h1>
       <form class="ui huge form" v-on:submit.prevent="submitSignin" >
           <div class="field">
             <input type="text" name="username" v-model="user_form.username" placeholder="Username">
           </div>



           <div class="field">
             <input type="password" name="last-name" v-model="user_form.password" placeholder="Password">
           </div>
           <div class="field">
             <button id="btnSubmitLogin" class="ui huge button green center floated" type="submit">Sign in</button>
           </div>

       </form>
     </div>
  </div>


</div> <!-- column -->
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      user_form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'userSignin'
    ]),
    submitSignin() {
      console.log('userSignin')
      this.userSignin(this.user_form)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>
