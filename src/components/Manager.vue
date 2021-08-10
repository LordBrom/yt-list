<template>
	<div class="row baseRow">
		<div class="col-12">
			<b-button
				@click="setShowEditForm(true)"
			>Add</b-button>
			<b-card>
				<b-table
					dark
					:items="ytChannels"
				></b-table>
			</b-card>
		</div>
		<edit-form></edit-form>
	</div>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	import EditForm from '@/components/EditForm'

	export default {
		components: {
			EditForm
		},
		methods: {
			...mapMutations({
				'setShowEditForm':"setShowEditForm"
			}),
		},
		computed: {
			...mapGetters({
				'ytChannels': 'getYtChannels'
			}),
		}
	}
</script>

<style scoped>
	.baseRow {
		margin-bottom: 0.5rem;
		background-color: #ffffff;
		padding: 0.5rem 0;
	}
</style>
