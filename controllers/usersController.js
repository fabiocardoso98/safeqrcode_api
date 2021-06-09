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
  },
  login(req, res) {
    try {
      const {username, password} = req.body;
      users.findOne({where: {username: username}}).then(user => {
        if (!user) {
          res.send({ msg: "Utilizador ou palavra passe não coincidem.", status: 'fail', error: null });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if(err){
            res.send({ msg: 'Falha na comunicação, tente mais tarde!!', status: 'error', error: err });
          }
          if(isMatch){
            res.send({ msg: "Sessão iniciada com sucesso", status: 'success', error: null, data: user });
          }else{
            res.send({ msg: "Utilizador ou palavra passe não coincidem.", status: 'fail', error: null, data: null}); 
          }
        })
      })
      .catch(err => {
            res.send({ msg: 'Falha na comunicação, tente mais tarde!!', status: 'error', error: err });
      });
    } catch (error) {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado", status: "error", data: null, error: error });
    }
  },
  allUsers(req, res) {
    users.findAll().then(result => {
      if(result) {
        res.send({ msg: "Utilizadores encontrados com sucesso", status: "success", data: result, error: null });
      }else{
        res.send({ msg: "Não existe utilizadores.", status: "fail", data: null, error: null });
      }
    }).catch(error => {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    })
  }
} 
 