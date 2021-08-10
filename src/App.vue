<template>
	<div id="app">

		<!--<b-navbar toggleable="lg" type="dark" variant="dark">
			<b-navbar-brand href="#">Nate's Youtube List</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item href="#">Home</b-nav-item>
					<b-nav-item href="#">Manage</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>-->

		<fab
			position="top-right"
			main-icon="settings"
			@click.native="toggleManager"
		></fab>

		<div class="container-fluid">
			<div class="row">

				<div v-if="!showManager" class="col">
					<video-line
						v-for="(channel) in sortedChannels"
						:key="channel.channelID"
						:channel="channel"
					></video-line>
				</div>

				<div v-else class="col">
					<manager
					></manager>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import VideoLine from '@/components/VideoLine'
	import Manager from '@/components/Manager'
	import Fab from 'vue-fab'
	import { mapGetters, mapActions } from 'vuex'

	export default {
		name: 'App',
		components: {
			VideoLine,
			Manager,
			Fab,
		},
		data() {
			return {
				channelData: [],
				showSideBar: true,
				showManager: false,
			}
		},
		methods: {
			...mapActions({
				'loadYtChannels': 'loadYtChannels'
			}),
			toggleManager: function () {
				this.showManager = !this.showManager;
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
			this.loadYtChannels();
		},
		watch: {
		}
	}
</script>

<style>
	@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css';
	@import 'https://fonts.googleapis.com/icon?family=Material+Icons';

	#app {
		background-color: #1d1d1d;
	}
</style>
