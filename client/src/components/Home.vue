<template>
  <div class="">
    {{message}}
    {{user.name}}
    <p v-if="is_login">Hello {{user.name}}!</p>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters({
    message: 'getMessage',
    user: 'getUserInfo',
    is_login: 'getLoginStatus'
  }),
  methods: {

  },
  created() {
  }
} // end of export
</script>

<style scoped>
</style>
