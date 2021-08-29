import Axios from 'axios'

const API_PORT = process.env.VUE_APP_API_PORT;
const API_DOMAIN = process.env.VUE_APP_API_DOMAIN;
const API_URL = `http://${API_DOMAIN}:${API_PORT}/api/yt/`;

var getChannelData = async function (channelID) {
	var rsp = await Axios.post(`${API_URL}channel`, {
		channelID: channelID
	}, {
		'Authorization': `Token ${localStorage.getItem('token')}`,
		'Content-Type': `application/json`,
	});
	return rsp.data;
}

var getYtVideoListByChannelID = async function (channelID) {
	var rsp = await Axios.post(`${API_URL}videos`, {
		channelID: channelID
	}, {
		'Authorization': `Token ${localStorage.getItem('token')}`,
		'Content-Type': `application/json`,
	});
	return rsp.data;
}

export { getYtVideoListByChannelID, getChannelData }
