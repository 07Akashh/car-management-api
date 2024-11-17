const express = require('express');
const userRoute = require('./user.route.js');
const carRoute = require('./car.route.js');
const imageRoute = require('./image.route.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../postman/project.openapi.json');
const app = express();

// Set up routes
app.use('/user', userRoute);
app.use('/car', carRoute);
app.use('/images', imageRoute);

// Serve Swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Global error handler (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
