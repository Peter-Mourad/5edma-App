require('dotenv').config();
const express = require('express');
const signUp = require('./routes/signUp');
const login = require('./routes/login');
const logout = require('./routes/logout');
const profile = require('./routes/profile');

const app = express();

app.use(express.json());
app.use(signUp);
app.use(login);
app.use(logout);
app.use(profile);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});