import Axios from 'axios'

const API_PORT = process.env.VUE_APP_API_PORT;
const API_DOMAIN = process.env.VUE_APP_API_DOMAIN;
const API_URL = `http://${API_DOMAIN}:${API_PORT}/api/yt/`;

var getChannelData = function (channelID) {
	return Axios.post(`${API_URL}channel`, {
		channelID: channelID
	}, {
		headers: {
			'Authorization': `Token ${localStorage.getItem('token')}`,
			'Content-Type': `application/json`,
		}
	});
}

var getYtVideoListByChannelID = function (channelID) {
	return Axios.post(`${API_URL}videos`, {
		channelID: channelID
	}, {
		headers: {
			'Authorization': `Token ${localStorage.getItem('token')}`,
			'Content-Type': `application/json`,
		}
	});
}

var getUserChannels = function () {
	return Axios.get(`${API_URL}channels`, {
		headers: {
			'Authorization': `Token ${localStorage.getItem('token')}`,
			'Content-Type': `application/json`,
		}
	});
}

export { getYtVideoListByChannelID, getChannelData, getUserChannels }
