"use strict";
const express = require('express');
const indexRouter = require('./routes/home/index');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(cors({
    origin: 'https://co-work-front.herokuapp.com',
    credentials: true,
}));
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: true,
    store:new FileStore(),
    cookie: {
        SameSite: 'none',
        secure: true,
        httpOnly: true,
    }
}));

app.use('/', indexRouter);


module.exports = app;
