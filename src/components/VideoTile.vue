<template>
	<div class="col-auto">
		<b-card
			:title="videoData.title"
			:img-src="videoData.thumbnail"
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
		},
	}
</script>

<style scoped>
	.card {
		max-width: 500px;
	}
</style>
