"use strict";

const User = require("../../models/User");

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
        response.session = req.session;
        
        res.status(200).json(response);
      }
      else res.status(401).json(response);
    }
  }
};

module.exports = {
  output,
  process
};