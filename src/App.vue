<template>
	<div id="app" class="container-fluid">
		<video-line
			v-for="(channel) in sortedChannels"
			:key="channel.channelID"
			:channelID="channel.channelID"
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
				channelData: []
			}
		},
		computed: {
			...mapGetters({
				'ytChannels': 'getYtChannels'
			}),
			sortedChannels: function() {
				var newData = [...this.ytChannels];
				return newData.sort((a,b) => {
					return (a.sort || 99) - (b.sort || 99);
				});
			}
		},
		created() {
		},
		watch: {
		}
	}
</script>

<style>
	#app {
		background-color: #1d1d1d;
	}
</style>
