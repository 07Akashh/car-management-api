const express = require('express');
const userRoute = require('./user.route.js');
const carRoute = require('./car.route.js');
const imageRoute = require('./image.route.js')
const app = express();

// app.use(express.json());

app.use('/user', userRoute);
app.use('/car', carRoute);
app.use('/images', imageRoute);

module.exports = app;