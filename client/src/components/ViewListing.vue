<template>
	<div>
		<video-line
			v-for="(channel) in sortedChannels"
			:key="channel.channelID"
			:channel="channel"
		></video-line>
	</div>
</template>

<script>
	import VideoLine from '@/components/VideoLine'
	import { mapGetters } from 'vuex'

	export default {
		name: 'ViewListing',
		components: {
			VideoLine,
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
	}
</script>
