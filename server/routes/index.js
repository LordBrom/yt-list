const express = require('express');

const { getYtVideoListByChannelID, getChannelData } = require('./../modules/youtubeApi');

const router = express.Router();

router.post('/channel', async (req, res) => {
	res.send(await getChannelData(req.body.channelID).catch(err => { console.log(err) }));
});
router.post('/videos', async (req, res) => {
	res.send(await getYtVideoListByChannelID(req.body.channelID).catch(err => { console.log(err) }));
});

module.exports = router;
