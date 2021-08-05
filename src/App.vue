<template>
	<div id="app">

		<b-navbar toggleable="lg" type="dark" variant="dark">
			<b-navbar-brand href="#">Nate's Youtube List</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item href="#">Home</b-nav-item>
					<b-nav-item href="#">Manage</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>

		<div class="container-fluid">
			<div class="row">

				<div class="col">
					<video-line
						v-for="(channel) in sortedChannels"
						:key="channel.channelID"
						:channelID="channel.channelID"
					></video-line>
				</div>

			</div>
		</div>
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
				channelData: [],
				showSideBar: true
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
