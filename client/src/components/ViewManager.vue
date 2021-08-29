<template>
	<div class="row baseRow">
		<div class="col-12">
			<b-card>
				<b-button
					@click="setShowEditForm(true)"
				>Add</b-button>
				<b-table
					id="sortableTable"
					tbody-tr-class="sortableRow"
					primary-key="channelID"
					sort-by="sort"
					dark
					:items="ytChannels"
					:fields="fields"
				>

					<template #cell(sortableHandle)="">
						<span class="material-icons dragHandle">drag_handle</span>
					</template>
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
	import Sortable from 'sortablejs'

	import EditForm from '@/components/EditForm'

	export default {
		name: 'ViewManager',
		components: {
			EditForm
		},
		data() {
			return {
				fields: [
					{
						key: 'sortableHandle',
						label: '',
						tdClass: 'smallCol'
					},
					{
						key: 'name',
						label: 'Name',
					},
					{
						key: 'remove',
						label: '',
						tdClass: 'smallCol'
					},
				],
				sortable: ''
			}
		},
		methods: {
			...mapMutations({
				'setShowEditForm':"setShowEditForm"
			}),
			...mapActions({
				'removeYtChannel':"removeYtChannel",
				'setYtChannelOrder':"setYtChannelOrder",
			}),
			handleRemoveChannel(channelIndex) {
				if (confirm("Are you sure you want to remove this channel?")) {
					this.removeYtChannel(channelIndex);
				}
			}
		},
		computed: {
			...mapGetters({
				'ytChannels': 'getYtChannels'
			}),
		},
		mounted: function(){
			var el = document.getElementById('sortableTable').getElementsByTagName('tbody')[0];
			var _self = this;
			this.sortable = Sortable.create(el, {
				handle: ".dragHandle",
				draggable: ".sortableRow",
				dataIdAttr: 'data-pk',
				onUpdate: function() {
					var newOrder = _self.sortable.toArray();
					_self.setYtChannelOrder(newOrder);
				}
			});
		},
	}
</script>

<style scoped>
	.baseRow {
		margin-bottom: 0.5rem;
		padding: 0.5rem 0;
	}
	.dragHandle {
		cursor: ns-resize;
	}
</style>
<style>
	.smallCol {
		width: 1%;
	}
</style>
