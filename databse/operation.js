const userCollection = require('../model/userModel');
const httpError = require('http-errors');
const { authSchema } = require('../helpers/validation');
const { signAccessToken, signRefreshToken } = require('../helpers/jwt_helper');
async function addUser(req, res, next) {
    try {
        const result = await authSchema.validateAsync(req.body);
        const doesExist = await userCollection.findOne({ email: result.email });
        if (doesExist) {
            throw httpError.Conflict(`${result.email} already exist`);
        }
        const user = new userCollection({
            email: result.email,
            password: result.password
        });
        const saveUser = await user.save();
        const accessToken = await signAccessToken(saveUser.id);
        const refreshToken = await signRefreshToken(saveUser.id);
        res.send({ accessToken, refreshToken });
    } catch (err) {
        if (err.isJoi === true) err.status = 422
        next(err);
    }
}
async function loginUser(req, res, next) {
    try {
        const result = await authSchema.validateAsync(req.body);
        const user = await userCollection.findOne({ email: result.email });
        if (!user) return next(httpError.NotFound('User not register!!'));
        const isMatch = await user.isvalidPassword(result.password);
        if (!isMatch) {
            throw httpError.Unauthorized('email/password not valid');
        }
        const accessToken = await signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);
        res.send({ accessToken, refreshToken });;
    } catch (error) {
        if (error.isJoi === true) return next(httpError.BadRequest('invalid email/password'));
        next(error);
    }
}
module.exports = { addUser, loginUser };