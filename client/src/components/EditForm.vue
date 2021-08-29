<template>
	<b-modal
		v-model="showModal"
		no-close-on-backdrop
		@show="resetModal"
		@hidden="resetModal"
		@ok="handleOk"
		@cancel="handleCancel"
	>
		<form ref="form" @submit.stop.prevent="handleSubmit">
			<b-form-group
				label="Channel ID"
				label-for="name-input"
				invalid-feedback="Name is required"
				description="https://www.youtube.com/channel/<Just this part>"
			>
				<b-form-input
					id="name-input"
					v-model="formData.channelID"
					required
				></b-form-input>
				<!--<b-form-invalid-feedback :state="validation">
					Your user ID must be 5-12 characters long.
				</b-form-invalid-feedback>-->
			</b-form-group>
		</form>
	</b-modal>
</template>

<script>
	//import Axios from 'axios';
	import {getChannelData} from '@/api/yt'
	import { mapGetters, mapMutations, mapActions } from 'vuex'

	export default {
		data() {
			return {
				formData: {
					channelID: "",
				}
			}
		},
		computed: {
			...mapGetters({
				'showEditForm': 'getShowEditForm',
				"ytChannels": "getYtChannels",
			}),
			showModal: {
				get() {
					return this.showEditForm;
				},
				set() {
					this.setShowEditForm(false);
				}
			}
		},
		methods: {
			...mapMutations({
				'setShowEditForm':"setShowEditForm",
			}),
			...mapActions({
				'addYtChannel':"addYtChannel",
			}),
			handleSubmit: function(bvModalEvt) {
				bvModalEvt.preventDefault()

			},
			handleOk: async function(bvModalEvt) {
				bvModalEvt.preventDefault();
				if (this.formData.channelID.length == 0) {
					return;
				}
				await getChannelData(this.formData.channelID).then((rsp) => {
					const channelData = rsp.data;
					if (Object.keys(channelData).length == 0) {
						return;
					}
					this.addYtChannel({
						channelID: this.formData.channelID,
						sort: this.ytChannels.length + 1,
						name: channelData.snippet.title,
					})
					this.setShowEditForm(false);
				});
			},
			handleCancel: function(bvModalEvt) {
				bvModalEvt.preventDefault()

				this.setShowEditForm(false);
			},
			resetModal: function() {
				this.formData.channelID = "";
			}
		},
	}
</script>

<style scoped>

</style>
