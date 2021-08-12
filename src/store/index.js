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
		setYtChannel: function (state, ytChannel, channelIndex) {
			state.ytChannels[channelIndex] = ytChannel;
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
		saveChannelData: function (state) {
			let currentList = [...state.getters.getYtChannels];
			console.log('Saving', currentList);
			localStorage.setItem(`channelData`, JSON.stringify(currentList));
		},
		addYtChannel: function(state, newChannelData) {
			const currentList = [...state.getters.getYtChannels];
			const newList = [...currentList, newChannelData];
			state.commit('setYtChannels', newList);
			localStorage.setItem(`channelData`, JSON.stringify(newList));
		},
		removeYtChannel: function(state, indexToRemove) {
			let currentList = [...state.getters.getYtChannels];
			currentList.splice(indexToRemove, 1);
			const newList = [...currentList];
			state.commit('setYtChannels', newList);
			state.dispatch('saveChannelData');
		},
		loadYtChannels: function(state) {
			const loadedList = JSON.parse(localStorage.getItem(`channelData`) || "[]");
			state.commit('setYtChannels', loadedList);
		},
		setYtChannelOrder: function (state, newOrder) {
			let currentList = [...state.getters.getYtChannels];
			var sortIndex = 1;
			newOrder.forEach(channelID => {
				var channelIndex = currentList.findIndex(channel => {
					return channel.channelID == channelID;
				});
				var channelData = currentList[channelIndex];
				channelData.sort = sortIndex;
				sortIndex++;
				state.commit('setYtChannel', {
					ytChannel: channelData,
					channelIndex: channelIndex,
				});
			});
			state.dispatch('saveChannelData');
		}
	}
})
