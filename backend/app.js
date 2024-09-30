require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());

fs.readdirSync(path.join(__dirname, 'routes')).forEach((file) => {
    if (file.endsWith('.js')) {
        const route = require(`./routes/${file}`);
        app.use(route);
    }
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});