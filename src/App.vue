<template>
	<div id="app">
		<video-line
			v-for="(video, index) in ytChannelList"
			:key="index"
			:channelID="video"
		></video-line>
	</div>
</template>

<script>
	import VideoLine from '@/components/VideoLine'

	export default {
		name: 'App',
		components: {
			VideoLine
		},
		data() {
			return {
				ytChannelList: ["UCH-_hzb2ILSCo9ftVSnrCIQ", "UCZ3edpZNi_qmuBG2FIHW5tQ", "UCs4br3aZLU0sOEM-3n0-6xQ", "UC5rUMdCFWPXYs9e8PBLzq5g", "UClhmd2Xe3zrYfuarqV-shKA", "UCNBwxPqzdZeLGv8SPoosjNg","UCgXiTWrFg05fTPfw1YLb5Ug"]
				//ytChannelList: ["UCH-_hzb2ILSCo9ftVSnrCIQ"]
			}
		},
	}
</script>

<style>
</style>
