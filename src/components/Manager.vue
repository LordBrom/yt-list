<template>
	<div class="row baseRow">
		<div class="col-12">
			<b-card>
				<b-button
					@click="setShowEditForm(true)"
				>Add</b-button>
				<b-table
					dark
					:items="ytChannels"
					:fields="fields"
				>

					<template #cell(remove)="row">
						<b-button size="sm" variant="danger" @click="handleRemoveChannel(row.index)" class="mr-1">
							remove
						</b-button>
					</template>
				</b-table>
			</b-card>
		</div>
		<edit-form></edit-form>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	import EditForm from '@/components/EditForm'

	export default {
		components: {
			EditForm
		},
		data() {
			return {
				fields: ['sort','name','channelID','remove']
			}
		},
		methods: {
			...mapMutations({
				'setShowEditForm':"setShowEditForm"
			}),
			...mapActions({
				'removeYtChannel':"removeYtChannel"
			}),
			handleRemoveChannel(channelIndex) {
				this.removeYtChannel(channelIndex);
			}
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
		padding: 0.5rem 0;
	}
</style>
