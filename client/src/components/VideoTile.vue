<template>
	<div class="col-12 col-sm-6 col-xl mb-3">
		<b-card
			overlay
			text-variant="white"
			:img-src="videoData.thumbnail"
			:title="videoData.title"
			:sub-title="timePast(videoData.publishedAt)"
			@click="openLink(videoData.id)"
		>
		</b-card>
	</div>
</template>


<script>
	export default {
		name: 'VideoTile',
		props: {
			videoData: {
				type: Object,
				required: true
			}
		},
		methods: {
			openLink: function(videoId) {
				window.open( `https://www.youtube.com/watch?v=${videoId}`, '_blank')
			},
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
	}
</script>

<style>
	.card-img-overlay {
		cursor: pointer;
		text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
		background-color: rgba(85, 85, 85, .5);
	}

	.card-img-overlay .card-title {
		max-height: 50px;
		overflow: hidden;
	}
	@media (min-width: 1200px) {
		.col-xl {
			flex: 1 0 0% !important;
		}
	}
</style>
