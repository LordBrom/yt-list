import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		ytChannels: ["UCH-_hzb2ILSCo9ftVSnrCIQ", "UCs4br3aZLU0sOEM-3n0-6xQ", "UC5rUMdCFWPXYs9e8PBLzq5g", "UCgXiTWrFg05fTPfw1YLb5Ug", "UClhmd2Xe3zrYfuarqV-shKA", "UCNBwxPqzdZeLGv8SPoosjNg", "UCZ3edpZNi_qmuBG2FIHW5tQ"]
	},
	getters: {
		getYtChannels: state => state.ytChannels
	},
	mutations: {
	}
})
