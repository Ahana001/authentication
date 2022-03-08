const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@authenticationcluster.od99h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);

mongoose.connection.on('connected', () => {
    console.log('database connected');
});
mongoose.connection.on('error', (err) => {
    console.log('error', err.message);
});
mongoose.connection.on('disconnected', () => {
    console.log('database disconnected');
});
process.on('SIGINT', async function() {
    console.log('Ctrl-C...');
    await mongoose.connection.close();
    process.exit(0);
});

module.exports = mongoose;