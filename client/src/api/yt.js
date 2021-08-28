import Axios from 'axios'

const API_PORT = process.env.VUE_APP_API_PORT;
const API_DOMAIN = process.env.VUE_APP_API_DOMAIN;
const API_URL = `http://${API_DOMAIN}:${API_PORT}/api/yt/`;

Axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`;
Axios.defaults.headers.common['Content-Type'] = `application/json`;

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
