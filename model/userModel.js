const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true }, // Always convert `email` to lowercase
    password: { type: String, required: true     }
});
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
    } catch (error) {
        next(error);
    }
});
userSchema.methods.isvalidPassword = async function(password){
    try {
        return await bcrypt.compare(password,this.password);
    } catch (error) {
        throw error;
    }
}
const userCollection = mongoose.model('user', userSchema);
module.exports = userCollection;