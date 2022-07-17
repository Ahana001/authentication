require('dotenv').config();
require('./config/connection');
const express = require('express');
const cookieParser = require('cookie-parser');
const authValidation = require('./middlewares/auth.validation');
const app = express();
const port = process.env.PORT;
const host = 'localhost';
const authRouter = require('./routes/route');
const logger = require('./logs/logger')("main");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/smoothies', authValidation, (req, res) => {
    res.render('smoothies');
});

app.use(authRouter);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use((req, res, next) => {
    res.status(404).render('404');
});

app.listen(port, () => {
    logger.info(`server started on HOST: ${host} PORT: ${port}`)
});