const UserController = require('../controller/UserController');
const routes = require('express').Router();
module.exports = function () {

    //apiRoutes.use('/auth', MiddleWare.auth, authRoutes());
    routes.get('/login', UserController.login);
    routes.post('/regist', UserController.regist);
    return routes;
};