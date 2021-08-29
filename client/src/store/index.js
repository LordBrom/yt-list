import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,

		ytChannels: [
		],

		showEditForm: false,
		showManager: false,
	},
	getters: {
		getUser: state => state.user,

		getYtChannels: state => state.ytChannels,

		getShowEditForm: state => state.showEditForm,
		getShowManager: state => state.showManager,
	},
	mutations: {
		setUser: function(state, user){
			state.user = user;
		},

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
		toggleShowManager: function(state) {
			state.showManager = !state.showManager;
		},
	},
	actions: {
		setUser: function (state, user) {
			state.commit('setUser', user);
		},

		saveChannelData: function (state) {
			let currentList = [...state.getters.getYtChannels];
			localStorage.setItem(`channelData`, JSON.stringify(currentList));
		},
		loadYtChannels: function (state) {
			console.log(localStorage.getItem(`channelData`));
			const loadedList = JSON.parse(localStorage.getItem(`channelData`) || "[]");
			state.commit('setYtChannels', loadedList);
		},
		addYtChannel: function(state, newChannelData) {
			const currentList = [...state.getters.getYtChannels];
			const newList = [...currentList, newChannelData];
			state.commit('setYtChannels', newList);
			state.dispatch('saveChannelData');
		},
		removeYtChannel: function(state, indexToRemove) {
			let currentList = [...state.getters.getYtChannels];
			currentList.splice(indexToRemove, 1);
			const newList = [...currentList];
			state.commit('setYtChannels', newList);
			state.dispatch('saveChannelData');
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
		},

		toggleShowManager: function (state) {
			state.commit('toggleShowManager');
		},
	}
})
