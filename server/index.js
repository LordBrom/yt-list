require('dotenv-flow').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', routes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
