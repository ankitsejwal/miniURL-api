const express = require('express');
const dbConnect = require('./dbConnect');
const users = require('./routes/users');
const urls = require('./routes/urls');
const app = express();
dbConnect();

app.use('/api/users', users);
app.use('/', urls);

const port = 3000;
app.listen(port, () => console.log(`Running on port ${port}`));
