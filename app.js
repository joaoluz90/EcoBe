var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var eventsRouter = require('./routes/eventsRoutes');
var colabsRouter = require('./routes/colaboradoresRoutes')
var usersRouter = require('./routes/utilizadoresRoutes')
var praiasRoutes = require('./routes/praiasRoutes')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/events', eventsRouter);
app.use('/api/colaboradores', colabsRouter);
app.use('/api/users', usersRouter);
app.use('/api/praias', praiasRoutes);


module.exports = app;
