import Axios from 'axios'

const API_PORT = process.env.VUE_APP_API_PORT;
const API_URL = `http://localhost:${API_PORT}/`;

var getChannelData = async function (channelID) {
	var rsp = await Axios.post(`${API_URL}channel`, {
		channelID: channelID
	});
	return rsp.data;
}

var getYtVideoListByChannelID = async function (channelID) {
	var rsp = await Axios.post(`${API_URL}videos`, {
		channelID: channelID
	});
	return rsp.data;
}

export { getYtVideoListByChannelID, getChannelData }
