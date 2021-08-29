<template>
	<div class="row">
		<template v-if="user">
			<div class="col">
				<listing v-if="!showManager"></listing>
				<manager v-else></manager>
			</div>
		</template>
		<template v-else>
			<div class="offset-md-3 col-12 col-md-6 mt-5 mb-5">
				<b-card>
					You are not logged in.
				</b-card>
			</div>
		</template>
	</div>
</template>

<script>
	import Listing from '@/components/ViewListing'
	import Manager from '@/components/ViewManager'
	import { mapGetters, mapActions } from 'vuex'

	export default {
		name: 'Dashboard',
		components: {
			Manager,
			Listing,
		},
		methods: {
			...mapActions({
			})
		},
		computed: {
			...mapGetters({
				'user': 'getUser',
				'showManager': 'getShowManager',
			}),
		},
	}
</script>

<style>
</style>
