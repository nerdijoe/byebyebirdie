<template>
  <div class="">
    {{message}}
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters({
    message: 'getMessage'
  }),
  methods: {

  }
} // end of export
</script>

<style scoped>
</style>
