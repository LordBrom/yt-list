import Axios from 'axios'

const API_KEY = process.env.VUE_APP_API_KEY;
const API_URL = "https://www.googleapis.com/youtube/v3/";

var getChannelData = async function(channelID) {
	var url = API_URL + "channels?part=snippet&id=" + channelID + "&key=" + API_KEY;
	var rsp = await Axios.get(url);
	if (rsp.data.items) {
		return rsp.data.items[0];
	}
	return {};
}

var getYtVideoListByChannelID = async function(channelID, resultsPerPage = 4) {
	var results = {
		videos: []
	};
	var url = `${API_URL}search?part=snippet&order=date&channelId=${channelID}&maxResults=${resultsPerPage}&key=${API_KEY}`;

	var promises = [];

	await Axios.get(url).then(rspChannel => {
		var videoList = "";
		var isFirst = true;
		rspChannel.data.items.forEach(video => {
			if (!isFirst) {
				videoList += ",";
			}
			isFirst = false;
			videoList += video.id.videoId;
		})
		console.log("videoList", videoList);
		var videoUrl = `${API_URL}videos?part=snippet&id=${videoList}&key=${API_KEY}`;
		promises.push(Axios.get(videoUrl).then(rspVideo => {
			console.log(rspVideo);
			rspVideo.data.items.forEach(video => {
				var videoData = {};
				videoData.id = video.id;
				videoData.title = video.snippet.title;
				videoData.description = video.snippet.description;
				videoData.publishedAt = video.snippet.publishedAt;

				if (video.snippet.thumbnails.maxres) {
					videoData.thumbnail = video.snippet.thumbnails.maxres.url;
				} else if (video.snippet.thumbnails.high) {
					videoData.thumbnail = video.snippet.thumbnails.high.url;
				} else if (video.snippet.thumbnails.medium) {
					videoData.thumbnail = video.snippet.thumbnails.medium.url;
				} else {
					videoData.thumbnail = video.snippet.thumbnails.default.url;
				}

				results.videos.push(videoData);
			})
		}));
	});
	await Promise.all(promises);
	results.videos.sort((a, b) => {
		return new Date(b.publishedAt) - new Date(a.publishedAt);
	})
	return results;
}

export { getYtVideoListByChannelID, getChannelData }
