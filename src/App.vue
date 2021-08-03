<template>
	<div id="app">
		<video-line
			v-for="(video, index) in ytChannels"
			:key="index"
			:channelID="video"
		></video-line>
	</div>
</template>

<script>
	import VideoLine from '@/components/VideoLine'
	import { mapGetters } from 'vuex'

	export default {
		name: 'App',
		components: {
			VideoLine
		},
		data() {
			return {
			}
		},
		computed: {
			...mapGetters({
				'ytChannels': 'getYtChannels'
			})
		},
	}
</script>

<style>
	#app {
		background-color: #1d1d1d;
	}
</style>
