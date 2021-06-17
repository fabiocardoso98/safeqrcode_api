const { qrcodes } = require('../models');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const Op = Sequelize.Op;
var fs = require('fs');
const config = require('../config.js');

module.exports = {
  saveQrCode(req, res) {
    try {
      qrcodes.create(req.body).then(result => {
        if(result) {
          res.send({ msg: "Qrcode criado", status: "success", data: result, error: null });
        }else{
          res.send({ msg: "Qrcode não criado, tente mais tarde", status: "fail", data: null, error: null });
        }
      }).catch(error => { 
        res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado", status: "error", data: null, error: error });
      });
    } catch (error) {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado", status: "error", data: null, error: error });
    }
  },
  getAllQrCode(req, res) {
    qrcodes.findAll().then(result => {
      if(result) {
        res.send({ msg: "Qrcodes encontrados com sucesso", status: "success", data: result, error: null });
      }else{
        res.send({ msg: "Não existe qrcodes.", status: "fail", data: null, error: null });
      }
    }).catch(error => {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    })
  },
  getOneQrCode(req, res) {
    qrcodes.findByPk(req.params.id).then(result => {
      if(result) {
        res.send({ msg: "Qrcode encontrado com sucesso", status: "success", data: result, error: null });
      }else{
        res.send({ msg: "Não existe qrcodes com esse id: " + req.params.id + ".", status: "fail", data: null, error: null });
      }
    }).catch(error => {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    })
  },
  getQrCodeByUser(req, res) {
    qrcodes.findAll({ where: { userId: req.body.userId }}).then(result => {
      if(result != 0) {
        res.send({ msg: "Qrcodes encontrados com sucesso", status: "success", data: result, error: null });
      }else{
        res.send({ msg: "Não existe qrcodes.", status: "success", data: null, error: null });
      }
    }).catch(error => {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    })
  }
} 
 