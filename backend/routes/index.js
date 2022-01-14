var express = require('express');
var doctorRoutes = require('./doctor');
var hospitalRoutes = require('./hospital');
var loginRoutes = require('./login');
var searchRoutes = require('./search');
var uploadRoutes = require('./upload');
var imageRoutes = require('./images');
var userRoutes = require('./user')

const routes = express.Router();

routes.use('/images', imageRoutes);
routes.use('/upload', uploadRoutes);
routes.use('/search', searchRoutes);
routes.use('/login', loginRoutes);
routes.use('/doctor', doctorRoutes);
routes.use('/hospital', hospitalRoutes);
routes.use('/user', userRoutes);

module.exports = routes;