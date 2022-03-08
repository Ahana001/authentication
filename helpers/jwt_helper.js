const httpErrors = require('http-errors');
const JWT = require('jsonwebtoken');
require('dotenv').config();
module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
            };
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const option = {
                expiresIn: '1h',
                issuer: 'floatbot.ai',
                audience: userId
            }
            JWT.sign(payload, secret, option, (err, token) => {
                if (err) {
                    reject(httpErrors.InternalServerError());
                }
                resolve(token);
            });
        });
    },
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(httpErrors.Unauthorized());
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                if (err === 'JsonWebTokenError') {
                    return next(httpErrors.Unauthorized())
                } else {
                    next(httpErrors.Unauthorized(err.message))
                }
            }
            res.payload = payload;
            next();
        })
    },
    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
            };
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const option = {
                expiresIn: '1y',
                issuer: 'floatbot.ai',
                audience: userId
            }
            JWT.sign(payload, secret, option, (err, token) => {
                if (err) {
                    reject(httpErrors.InternalServerError());
                }
                resolve(token);
            });
        });
    },
    verifyRefreshToken: (refreshtoken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if (err) {
                    reject(httpErrors.Unauthorized())
                }
                const userId = payload.aud;
                resolve(userId);
            })
        });
    }
}