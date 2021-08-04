import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// "Refferencing"
// https://github.com/SinghDigamber/vuex-state-management-app/blob/master/src/store/modules/users-module.js

export default new Vuex.Store({
	state: {
		ytChannels: [{
			//Yogs main
			channelID: "UCH-_hzb2ILSCo9ftVSnrCIQ",
			sort: 1,
		},{
			//Duncan
			channelID: "UCs4br3aZLU0sOEM-3n0-6xQ",
			sort: 2,
		},{
			//Tom
			channelID: "UC5rUMdCFWPXYs9e8PBLzq5g",
			sort: 3,
		},{
			//Triforce
			channelID: "UCgXiTWrFg05fTPfw1YLb5Ug",
			sort: 4,
		},{
			//games night
			channelID: "UClhmd2Xe3zrYfuarqV-shKA",
			sort: 5,
		},{
			//civ
			channelID: "UCNBwxPqzdZeLGv8SPoosjNg",
			sort: 6,
		},{
			//TDD
			channelID: "UCZ3edpZNi_qmuBG2FIHW5tQ",
			sort: 7,
		},]
	},
	getters: {
		getYtChannels: state => state.ytChannels
	},
	mutations: {
	},
	actions: {
		addChannel: function() {

		}
	}
})
