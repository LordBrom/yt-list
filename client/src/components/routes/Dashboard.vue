<template>
	<div>
		<fab
			position="top-right"
			main-icon="settings"
			@click.native="toggleManager"
		></fab>
		<div class="row">
			<div class="col">
				<listing v-if="!showManager"></listing>
				<manager v-else></manager>
			</div>
		</div>
	</div>
</template>

<script>
	import Listing from '@/components/ViewListing'
	import Manager from '@/components/ViewManager'
	import Fab from 'vue-fab'
	import { mapGetters, mapActions } from 'vuex'

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
		computed: {
			...mapGetters({
				'user': 'getUser'
			}),
		},
		afterMounted() {
			if (!this.user) {
				this.$router.push("/login");
			} else {
				this.loadYtChannels();
			}
		},
	}
</script>

<style>
</style>
