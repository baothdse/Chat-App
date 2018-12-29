const UserController = require('../controller/UserController');
const routes = require('express').Router();
module.exports = function (io) {

    //apiRoutes.use('/auth', MiddleWare.auth, authRoutes());
    //apiRoutes.use('/unauht', MiddleWare.auth, authRoutes());
    routes.get('/login', UserController.login);
    routes.post('/regist', UserController.regist);
    return routes;
};