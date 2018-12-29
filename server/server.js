const express = require('express');
const config = require('./config/config');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const Users = require('./models/Users');
const mongoose = require('mongoose');
const dbConnection = mongoose.connection;
const PORT = process.env.PORT || config.port;
const router = require('./routes/router');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

let server = app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log("Server start on port: " + PORT);
});
const io = require('./utils/socket').listen(server);

mongoose.connect(config.db_connection);
dbConnection.on('open', () => {
    console.log('Connected to database!')
});

app.use('/api', router(io));