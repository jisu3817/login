const express = require('express');
const router = express.Router();
const ctrl = require('./home.ctrl');

router.get('/', ctrl.output.home);
router.get('/loginCheck', ctrl.process.check);
router.get('/logout', ctrl.process.logout);

router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register);

module.exports = router;
