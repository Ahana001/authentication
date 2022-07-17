const userCollection = require('../models/user');
const loginLogger = require('../logs/logger')('login');
const signupLogger = require('../logs/logger')('signup');
const { signToken } = require('../utils/jwt');

function handleError(err) {
    let errors = { email: '', password: '' };
    if (err.message.includes("user validation failed")) {
        Object.keys(err.errors).map(val => {
            errors[val] = err.errors[val].properties.message;
        });
    }
    if (err.code == 11000) {
        errors.email = "Email already register";
    }

    if (err.message === "Email not registered") {
        errors.email = "Email not registred";
    }
    if (err.message === "Invalid Password") {
        errors.password = "Invalid credentials";
    }
    return errors;
}

function get_login(req, res) {
    res.render("login");
}

async function post_login(req, res) {
    let { email, password } = req.body;
    try {
        let user = await userCollection.login(email, password);
        let token = await signToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 });
        res.status(200).json({ "id": user._id });
    } catch (error) {
        let errors = handleError(error);
        res.status(400).json({ errors });
    }
}

function get_signup(req, res) {
    res.render("signup");
}

async function post_signup(req, res) {
    const {
        email,
        password
    } = req.body;
    try {
        //console.log(newUser); return promise so we use try catch with await to fullfil or reject promise
        const newUser = await userCollection.create({
            email,
            password
        });
        let token = await signToken(newUser._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 });
        signupLogger.info(`New User created : ${newUser.email}`);
        res.status(201).json({ "id": newUser._id });
    } catch (error) {
        let errors = handleError(error);
        res.status(400).json({ errors });
    }
}
async function get_logout(req, res) {
    res.cookie("jwt", "", { httpOnly: true, maxAge: 60 });
    res.redirect("/")
}
module.exports = {
    get_login,
    get_signup,
    post_login,
    post_signup,
    get_logout
}