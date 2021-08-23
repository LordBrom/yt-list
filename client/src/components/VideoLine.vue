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
	import {getYtVideoListByChannelID} from '@/modules/apiHandler.js'

	export default {
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
					this.channelData = rsp;
					localStorage.setItem(`channelData_${this.channel.channelID}`, JSON.stringify(rsp));
					localStorage.setItem(`channelDataSaved_${this.channel.channelID}`, new Date().getTime());
				}).then(() => {
					this.isLoading = false;
				})
			}
		},
		computed: {
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
		margin-bottom: 0.5rem;
		background-color: #4e4d4e;
		padding: 0.5rem 0;
	}

	.titleRow {
		color: white;
	}

	.videoRow {
		/*flex-wrap: nowrap;
		overflow-x: auto;*/
	}
</style>
