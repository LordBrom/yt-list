import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		ytChannels: [
		],
		showEditForm: false,
	},
	getters: {
		getYtChannels: state => state.ytChannels,
		getShowEditForm: state => state.showEditForm,
	},
	mutations: {
		setYtChannels: function (state, ytChannels) {
			state.ytChannels = ytChannels;
		},
		addYtChannel: function(state, channelData) {
			state.ytChannels.push(channelData);
		},
		setShowEditForm: function(state, visible) {
			state.showEditForm = visible;
		},
		toggleShowEditForm: function(state) {
			state.showEditForm = !state.showEditForm;
		},
	},
	actions: {
		addYtChannel: function(state, newChannelData) {
			const currentList = [...state.getters.getYtChannels];
			const newList = [...currentList, newChannelData];
			state.commit('setYtChannels', newList);
			localStorage.setItem(`channelData`, JSON.stringify(newList));
		},
		loadYtChannels: function(state) {
			const loadedList = JSON.parse(localStorage.getItem(`channelData`) || "[]");
			state.commit('setYtChannels', loadedList);
		}
	}
})
