<template>
  <div class="">
    {{message}}
    {{user.name}}
    <p v-if="is_login">Hello {{user.name}}!</p>


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
              1 Hour Ago
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
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters({
    message: 'getMessage',
    user: 'getUserInfo',
    is_login: 'getLoginStatus',
    twits: 'getTwits'
  }),
  methods: {

  },
  created() {
  }
} // end of export
</script>

<style scoped>
</style>
