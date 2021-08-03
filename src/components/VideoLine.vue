<template>
	<div class="row baseRow">
		<div class="col-12">
			<div class="row">
				<div class="col-12">
					<h2>
						<b-button
							@click="loadData()"
						>
							reload
						</b-button>
						{{ channelName }}
					</h2>
				</div>
			</div>
			<div class="row videoRow">
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
	import youtubeApi from '@/modules/youtubeApi.js'

	export default {
		components: {
			VideoTile
		},
		props: {
			channelID: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				channelData: {},
			}
		},
		methods: {
			loadData: async function() {
				youtubeApi(this.channelID).then(rsp => {
					this.channelData = rsp;
					localStorage.setItem(`channelData_${this.channelID}`, JSON.stringify(rsp));
					localStorage.setItem(`channelDataSaved_${this.channelID}`, new Date().getTime());
				})
			}
		},
		computed: {
			channelName: function() {
				return this.channelData?.channel?.name || ""
			}
		},
		async mounted() {
			var hourInSeconds = 3600;
			var savedChannelData = JSON.parse(localStorage.getItem(`channelData_${this.channelID}`));
			var lastSavedTime = localStorage.getItem(`channelDataSaved_${this.channelID}`);
			var nowTime = new Date().getTime();
			if (!savedChannelData || nowTime > (lastSavedTime + hourInSeconds)){
				await this.loadData();
			} else {
				this.channelData = savedChannelData;
			}
		},
	}
</script>

<style scoped>
	.baseRow {
		margin-bottom: 25px;
	}

	.videoRow {
		flex-wrap: nowrap;
		overflow-x: scroll;
	}
</style>
