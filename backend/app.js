require('dotenv').config();
const express = require('express');
const signUp = require('./routes/signUp');
const login = require('./routes/login');

const app = express();

app.use(signUp);
app.use(login);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});