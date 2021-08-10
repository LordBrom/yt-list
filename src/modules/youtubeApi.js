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
	var url = API_URL + "search?part=snippet&order=date&channelId=" + channelID + "&maxResults=" + resultsPerPage + "&key=" + API_KEY;

	var channelData = await Axios.get(url);
	var videos = channelData.data.items;
	results.channel = {
		name: channelData.data.items[0].snippet.channelTitle,
		data: channelData.data
	};
	var promises = [];
	videos.forEach(video => {
		var videoUrl = API_URL + "videos?part=snippet&id=" + video.id.videoId + "&key=" + API_KEY;
		promises.push(Axios.get(videoUrl).then(rsp => {
			var videoData = {};
			var video = rsp.data.items[0];
			videoData.id = video.id;
			videoData.title = video.snippet.title;
			videoData.description = video.snippet.description;
			videoData.channelId = video.snippet.channelId;
			videoData.channelName = video.snippet.channelTitle;
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
		}));
	});
	await Promise.all(promises);
	results.videos.sort((a, b) => {
		return new Date(b.publishedAt) - new Date(a.publishedAt);
	})
	return results;
}

export { getYtVideoListByChannelID, getChannelData }
