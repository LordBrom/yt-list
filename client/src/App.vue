<template>
	<div id="app">
		<fab
			position="top-right"
			main-icon="settings"
			@click.native="toggleManager"
		></fab>

		<div class="container-fluid">
			<div class="row">
				<div class="col">
					<listing v-if="!showManager"></listing>
					<manager v-else></manager>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Listing from '@/components/ViewListing'
	import Manager from '@/components/ViewManager'
	import Fab from 'vue-fab'
	import { mapActions } from 'vuex'

	export default {
		name: 'App',
		components: {
			Manager,
			Listing,
			Fab,
		},
		data() {
			return {
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
		created() {
			this.loadYtChannels();
		},
	}
</script>

<style>
	/*@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css';
	@import 'https://fonts.googleapis.com/icon?family=Material+Icons';*/

	#app {
		background-color: #1d1d1d;
	}
</style>
