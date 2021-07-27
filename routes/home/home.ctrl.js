"use strict";

const { response } = require("express");
const session = require("express-session");
const User = require("../../models/User");
const UserStorage = require("../../models/UserStorage");

const output = {
  home: (req, res) => {
    res.send("루트 경로");
  },

  login: (req, res) => {
    res.render("lgoin");
  },
};

const process = {
  login: async (req, res) => {
    if (req.session.is_logined) {
      res.json({});
    } else {
      const user = new User(req.body);
      const response = await user.login();
      
      if (response.success) {
        req.session.user = req.body.id;
        req.session.is_logined = true;
        req.session.save(() => {
          res.status(200).json(response);
        })  
      }
      else res.status(401).json(response);
    }
  },
  
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).json({ success: true });
  },

  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();

    if (response.success) {
      res.status(200).json(response);
    }
    else res.status(400).json(response);
  },
  
  check: async (req, res) => {
    if (req.session.is_logined) {
      const userId = req.session.user;
      const user = await UserStorage.getUserInfo(userId);

      res.status(200).json({success: true, name: user.id});
    }
    else res.status(400).json({success: false});
  }
};

module.exports = {
  output,
  process
};