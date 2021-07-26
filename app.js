"use strict";
const express = require('express');
const indexRouter = require('./routes/home/index');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: true,
    store:new FileStore(),
   }));

app.use('/', indexRouter);


module.exports = app;
