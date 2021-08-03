<template>
	<div class="col-auto">
		<b-card
			overlay
			text-variant="white"
			:img-src="videoData.thumbnail"
			:title="videoData.title"
			@click="openLink(videoData.id)"
		>
			<b-card-text>
				{{videoData.publishedAt | timePast}}
			</b-card-text>
		</b-card>
	</div>
</template>


<script>
	export default {
		components: {
		},
		props: {
			videoData: {
				type: Object,
				required: true
			}
		},
		filters: {
			timePast: function(dateStr) {
				var now = new Date();
				var date = new Date(dateStr);
				var result = "";

				var diff = now.getTime() - date.getTime();

				switch(true)
				{
					case (diff < (1000 * 60)):
						result = Math.floor(diff / (1000)) + " Seconds Ago";
						break;
					case (diff < (1000 * 60 * 60)):
						result = Math.floor(diff / (1000 * 60)) + " Minutes Ago";
						break;
					case (diff < (1000 * 60 * 60 * 24)):
						result = Math.floor(diff / (1000 * 60 * 60)) + " Hours Ago";
						break;
					default:
						result = Math.floor(diff / (1000 * 60 * 60 * 24)) + " Days Ago";
						break;
				}
				return result;
			}
		},
		methods: {
			openLink: function(videoId) {
				window.open( `https://www.youtube.com/watch?v=${videoId}`, '_blank')
			}
		},
	}
</script>

<style scoped>
	.card {
		max-width: 350px;
	}
</style>
<style>
	.card-img-overlay {
		text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
		background-color: rgba(160, 160, 160, .5);
	}
</style>
