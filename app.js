require('dotenv').config();
const express = require('express');
const httpError = require('http-errors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;
require('./config/connection');
const { verifyAccessToken } = require('./helpers/jwt_helper');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', verifyAccessToken, async (req, res, next) => {
    console.log(req.headers['authorization']);
    res.send("welcome!!");
});
app.use('/authentication', require('./routes/authentication'));
app.use(async (req, res, next) => {
    next(httpError.NotFound());
});
app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message
    })
});
app.listen(port, () => {
    console.log(`server is running at port ${port}`);
});