<template>
	<div class="row baseRow">
		<div class="col-12">
			<div class="row titleRow" @click="hideVideos = !hideVideos">
				<div class="col-12">
					<h2>
						<b-button
							@click.stop="loadData()"
						>
							reload
						</b-button>
						{{ channel.name }}
					</h2>
				</div>
			</div>
			<div v-if="isLoading" class="text-center">
				<b-spinner></b-spinner>
			</div>
			<div v-if="!isLoading && !hideVideos" class="row videoRow">
				<video-tile
					v-for="(video, index) in channelData.videos"
					:key="index"
					:videoData="video"
				></video-tile>
			</div>
		</div>
	</div>
</template>

<script>
	import VideoTile from '@/components/VideoTile'
	import {getYtVideoListByChannelID} from '@/api/yt'

	export default {
		name: 'VideoLine',
		components: {
			VideoTile
		},
		props: {
			channel: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				channelData: {},
				isLoading: false,
				hideVideos: false,
			}
		},
		methods: {
			loadData: async function() {
				this.isLoading = true;
				getYtVideoListByChannelID(this.channel.channelID).then(rsp => {
					this.channelData = rsp.data;
					localStorage.setItem(`channelData_${this.channel.channelID}`, JSON.stringify(rsp.data));
					localStorage.setItem(`channelDataSaved_${this.channel.channelID}`, new Date().getTime());
				}).then(() => {
					this.isLoading = false;
				})
			}
		},
		async mounted() {
			var hourInMilliseconds = 3600000;
			var savedChannelData = JSON.parse(localStorage.getItem(`channelData_${this.channel.channelID}`));
			var lastSavedTime = parseFloat(localStorage.getItem(`channelDataSaved_${this.channel.channelID}`));
			var nowTime = new Date().getTime();
			if (!savedChannelData || nowTime > (lastSavedTime + hourInMilliseconds)){
				await this.loadData();
			} else {
				this.channelData = savedChannelData;
			}
		},
	}
</script>

<style scoped>
	.baseRow {
		background-color: #4e4d4e;
	}

	.titleRow {
		color: white;
	}
</style>
