const express = require('express');
const dbConnect = require('./dbConnect');
const users = require('./routes/users');
const index = require('./routes/index');
const urls = require('./routes/urls');
const app = express();
dbConnect();

app.use('/', index);
app.use('/api/users', users);
app.use('/api/urls', urls);

const port = 3000;
app.listen(port, () => console.log(`Running on port ${port}`));
