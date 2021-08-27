require('dotenv-flow').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.promise = global.Promise;

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));
app.use(express.json());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'youtube-list', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

mongoose.connect(process.env.MONGODB_URI)
	.then(() => { console.log('DB connected'); })
	.catch((err) => { console.log(`DB NOT connected ${err}`); });
mongoose.set('debug', true);

require('./models/Users');
require('./config/passport');
app.use(require('./routes/index'));

app.use((err, req, res) => {
	res.status(err.status || 500);

	res.json({
		errors: {
			message: err.message,
			error: {},
		},
	});
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
