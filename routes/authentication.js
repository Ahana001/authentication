const express = require('express');
const route = express.Router();
const operation = require('../databse/operation');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt_helper');
route.post('/register', async (req, res, next) => {
    operation.addUser(req, res, next);
});
route.post('/login', (req, res, next) => {
    operation.loginUser(req, res, next);
});
route.post('/refresh-token', async (req, res, next) => {
    try {
        const { refresh_token } = req.body;
        const userId = await verifyRefreshToken(refresh_token);
        const newAccessToken = await signAccessToken(userId);
        const newRefreshToken = await signRefreshToken(userId);
        res.send({ newAccessToken, newRefreshToken })
    } catch (error) {
        next(error);
    }
});
route.delete('/logout', (req, res, next) => {
    res.send('logout');
});
module.exports = route;