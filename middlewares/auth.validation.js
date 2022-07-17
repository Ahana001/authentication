const { verifyToken } = require('../utils/jwt.js');
const logger = require('../logs/logger')('authValidation');

const authValidation = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        verifyToken(token)
            .then((decodeToken) => {
                logger.info(`User id with ${decodeToken.aud} logged in`);
                next();
            }).catch((err) => {
                logger.info(`${err.message} | TOKEN : ${token}`);
                res.redirect('/login');
            })
    } else {
        res.redirect('/login');
    }
}
module.exports = authValidation;