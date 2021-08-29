import Axios from 'axios'

const API_PORT = process.env.VUE_APP_API_PORT;
const API_DOMAIN = process.env.VUE_APP_API_DOMAIN;
const API_URL = `http://${API_DOMAIN}:${API_PORT}/api/users/`;

var signUp = function (username, password) {
	return Axios.post(`${API_URL}`, {
		user: {
			email: username,
			password: password
		}
	});
}

var login = function (username, password) {
	return Axios.post(`${API_URL}login`, {
		user: {
			email: username,
			password: password
		}
	});
}

var getCurrent = async function () {
	const token = localStorage.getItem('token');
	if (token !== null) {
		return Axios.get(`${API_URL}current`, {}, {
			'Authorization': `Token ${localStorage.getItem('token')}`,
			'Content-Type': `application/json`,
		});
	}
	return new Promise(() => { return null });
}


export { login, signUp, getCurrent }
