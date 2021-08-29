const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

const { getYtVideoListByChannelID, getChannelData } = require('./../../modules/youtubeApi');

router.post('/channel', auth.required, (req, res, next) => {
	const { body: { channelID } } = req;

	return getChannelData(channelID)
		.then((rsp) => {
			return res.json(
				rsp
			);
		}).catch(err => { console.log(err) });
});

router.post('/videos', auth.required, async (req, res, next) => {
	const { body: { channelID } } = req;

	return getYtVideoListByChannelID(channelID)
	.then((rsp) => {
			return res.json(
				rsp
			);
		}).catch(err => {
			console.log(err)
		});
});

router.get('/channels', auth.required, async (req, res, next) => {
	const { payload: { id } } = req;

	return Users.findById(id)
		.then((user) => {
			if (!user) {
				return res.sendStatus(400);
			}

			return res.json( user.toChannelsJSON() );
		});
});

router.post('/channels', auth.required, async (req, res, next) => {
	const { payload: { id } } = req;

	return Users.findById(id)
		.then((user) => {
			if (!user) {
				return res.sendStatus(400);
			}

			return res.json( user.tochannelsJSON() );
		});
});

module.exports = router;
