<template>
  <div class="">

    <div class="ui positive message" v-if="!is_login">
      <div class="header">
        Registration closed
      </div>
      <p>Sorry for the inconvenience. We'll send out new invites in a few days :D</p>
    </div>

    <h2 v-if="is_login">Hello {{user.name}}!</h2>

    <twit-form v-if="is_login"></twit-form>


    <h2>Feeds</h2>
    <div class="ui feed">
      <div class="event" v-for="twit in twits">
        <div class="label">
          <!-- <img src="/images/avatar/small/elliot.jpg"> -->
          <i class="angellist icon"></i>
        </div>
        <div class="content">
          <div class="summary">
            <a class="user">
              {{twit.user.name}}
            </a> {{ twit.text }}
            <div class="date">
              1 minute Ago
            </div>
          </div>
          <div class="meta">


            <a class="ui purple label" v-for="tag in twit.tags">#{{tag}}</a>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import TwitForm from './TwitForm'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      twitForm: {
        text: ''
      }
    }
  },
  components: {
    TwitForm
  },
  computed: mapGetters({
    message: 'getMessage',
    user: 'getUserInfo',
    is_login: 'getLoginStatus',
    twits: 'getTwits'
  }),
  methods: {
    onTwitFormSubmit(){
      console.log('onTwitFormSubmit')
    }
  },
  created() {
  }
} // end of export
</script>

<style scoped>
</style>
