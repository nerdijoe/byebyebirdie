<template>
	
<div>
	
<form class="ui form" v-on:submit.prevent="submitTwitForm">
  <div class="fields">
    <div class="eight wide field">
      <input type="text" placeholder="Your Twit.." v-model="twitForm.text">
    </div>

    <div class="five wide field">
    	<button class="ui violet basic submit button" type="submit">Post</button>
    </div>

  </div>
</form>

</div>


</template>


<script>
	import {mapActions} from 'vuex'

	export default {
		data() {
			return {
				twitForm: {
					text: ''
				}
			}
		},
		methods: {
			...mapActions([
				'postTwit'
			]),
			submitTwitForm() {
				console.log("submitTwitForm")
				this.postTwit(this.twitForm)
				this.clearForm()
			},
			clearForm() {
				this.twitForm.text = ''
			}
		}
	}
</script>

<style scoped>
	
</style>