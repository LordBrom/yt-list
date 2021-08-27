const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');

const { getYtVideoListByChannelID, getChannelData } = require('./../../modules/youtubeApi');

router.post('/channel', auth.optional, (req, res, next) => {
	const { body: { channelID } } = req;

	return getChannelData(channelID)
		.then((rsp) => {
			return res.json(
				rsp
			);
		}).catch(err => { console.log(err) });
});

router.post('/videos', auth.optional, async (req, res, next) => {
	const { body: { channelID } } = req;

	console.log(channelID);

	return getYtVideoListByChannelID(channelID)
	.then((rsp) => {
		console.log("HERE", rsp);
		console.log(rsp);
			return res.json(
				rsp
			);
		}).catch(err => {
			console.log(err)
		});
});

module.exports = router;
