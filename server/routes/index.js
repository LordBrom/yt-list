const express = require('express');

const { getYtVideoListByChannelID, getChannelData } = require('./../modules/youtubeApi');

const router = express.Router();

router.post('/channel', async (req, res) => {
	res.send(await getChannelData(req.body.channelID));
});
router.post('/videos', async (req, res) => {
	res.send(await getYtVideoListByChannelID(req.body.channelID));
});

module.exports = router;
