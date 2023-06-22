const express = require('express');
const dbConnect = require('./dbConnect');
const app = express();
dbConnect();

app.use('/api/users');

const port = 3000;
app.listen(port, () => console.log(`Running on port ${port}`));
