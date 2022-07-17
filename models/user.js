const mongoose = require('mongoose');
const {
    isEmail
} = require('validator');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please Enter Email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please Enter valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        minLength: [6, "Password must be minimum 6 character"]
    }
});

//fire after user data saved in database
userSchema.post('save', function (doc, next) {
    next();
});

//fire before user data saved in database
userSchema.pre('save', async function (next) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email: email }); //this refered to use model
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("Invalid Password");
    }
    throw Error("Email not registered");

}
const userCollection = mongoose.model('user', userSchema);

module.exports = userCollection;