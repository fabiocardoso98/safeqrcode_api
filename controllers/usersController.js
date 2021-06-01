const { users } = require('../models');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const Op = Sequelize.Op;
var fs = require('fs');
const config = require('./../config.js');

module.exports = {
  setUser(req, res) {
    try {
      users.findAll({ where: { username: req.body.username, email: req.body.email }}).then(result => {
        if(!result || result.length <= 0) {
          bcrypt.hash(req.body.password, 10, function(err, hash) {
            req.body.password = hash;
            users.create(req.body).then(result => {
              if(result) {
                res.send({ msg: "Utilizador Criado", status: "success", data: result, error: null });
              }else{
                res.send({ msg: "Utilizador não criado, tente mais tarde", status: "fail", data: null, error: null });
              }
            }).catch(error => { 
              res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado1", status: "error", data: null, error: error });
            })
          });
        }else{
          console.log("5")
          res.send({ msg: "Username ou e-mail já existe", status: "fail", data: null, error: null });
        }
      }).catch(error => { 
        console.log("6")
        res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado2", status: "error", data: null, error: error });
      })
    } catch (error) {
      console.log("7")
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado3", status: "error", data: null, error: error });
    }
  }
} 
 