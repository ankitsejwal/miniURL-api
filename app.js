const express = require('express');
const cors = require('cors');
const dbConnect = require('./dbConnect');
const users = require('./routes/users');
const index = require('./routes/index');
const urls = require('./routes/urls');
const auth = require('./routes/auth');
const app = express();
dbConnect();

app.use(cors({ origin: 'http://localhost:3000', credentials: true, optionsSuccessStatus: 200 }));
app.use(express.json());
app.use('/', index);
app.use('/api/users', users);
app.use('/api/urls', urls);
app.use('/api/auth', auth);

const port = 5000;
app.listen(port, () => console.log(`Running on port ${port}`));
