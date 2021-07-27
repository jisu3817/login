"use strict";
const express = require('express');
const app = express();

const cors = require('cors');
const bcrypt = require ('bcrypt');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const indexRouter = require('./routes/home/index');

app.set('views', './views');
app.set('view engine', 'ejs');

app.set('trust proxy', 1);
app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: true,
    store:new FileStore(),
    cookie: {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
    }
}));

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

module.exports = app;
