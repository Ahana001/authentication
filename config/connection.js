const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@authenticationcluster.od99h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);

mongoose.connection.on('connected', () => {
    console.log('database connected');
});
mongoose.connection.on('error', (err) => {
    console.log('error', err.message);
});
mongoose.connection.on('disconnected', () => {
    console.log('database disconnected');
});

module.exports = mongoose;