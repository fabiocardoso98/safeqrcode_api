const { MultiQrcodes, qrcodes } = require('../models');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const Op = Sequelize.Op;
var fs = require('fs');
const config = require('../config.js');

module.exports = {
  saveMultiQrCode(req, res) {
    try {
      MultiQrcodes.create(req.body).then(result => {
        if(result) {
          MultiQrcodes.findByPk(result.id).then(resultss => {
            var index = 0;
            req.body.qrcodes.forEach(qrcodeId => {
              qrcodes.findByPk(qrcodeId).then(qrcode => {
                resultss.addQrcodes(qrcode).then( results => {
                  index++;
                  if(index >= req.body.qrcodes.length) {
                    res.send({ msg: "Multi qrcode criado", status: "success", data: resultss, error: null });
                  }
                })
              })
            });
          }).catch(error => {
            res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado2", status: "error", data: null, error: error });
          })
        }else{
          res.send({ msg: "Multi qrcode criado, tente mais tarde3", status: "fail", data: null, error: null });
        }
      }).catch(error => { 
        res.send({ msg: "Aconteceu algum erro, tente mais tarde4, obrigado", status: "error", data: null, error: error });
      });
    } catch (error) {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde,5 obrigado", status: "error", data: null, error: error });
    }
  },
  getAllMultiQrCode(req, res) {
    MultiQrcodes.findAll({ include: [{model: qrcodes, through: { attributes: [] }}]  }).then(result => {
      if(result) {
        res.send({ msg: "Multi qrcodes encontrados com sucesso", status: "success", data: result, error: null });
      }else{
        res.send({ msg: "Não existe Multi qrcodes.", status: "fail", data: null, error: null });
      }
    }).catch(error => {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    })
  },
  getOneMultiQrCode(req, res) {
    MultiQrcodes.findAll({ where: { id: req.params.id }, include: [{model: qrcodes, through: { attributes: [] }}]  }).then(result => {
      if(result) {
        res.send({ msg: "Multi qrcodes encontrado com sucesso", status: "success", data: result, error: null });
      }else{
        res.send({ msg: "Não existe multi qrcodes com esse id: " + req.params.id + ".", status: "fail", data: null, error: null });
      }
    }).catch(error => {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    })
  },
  getMultiQrCodeByUser(req, res) {
    MultiQrcodes.findAll({ where: { userId: req.params.userId }, include: [{model: qrcodes, through: { attributes: [] }}]}).then(result => {
      if(result != 0) {
        res.send({ msg: "Multi qrcodes encontrados com sucesso", status: "success", data: result, error: null });
      }else{
        res.send({ msg: "Não existe multi qrcodes .", status: "success", data: null, error: null });
      }
    }).catch(error => {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    })
  },
  deleteMultiQrCode(req, res) {
    try {
      MultiQrcodes.destroy({ where: {  id: req.params.id } }).then(result => {
        if(result) {
          res.send({ msg: "Multi qrcodes eliminada com sucesso", status: "success", data: null, error: null });
        }else{
          res.send({ msg: "Não existe essa multi qrcodes com esse id: " + req.params.id + ".", status: "fail", data: null, error: null });
        }
      }).catch(error => {
        res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
      })
    } catch (error) {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    }
  },
  updateMultiQrCode(req, res) {
    try {
      MultiQrcodes.findByPk(req.params.id).then(qrcode => {
        if(qrcode) {
          qrcode.update(req.body).then(result=> {
              if(result) {
                res.send({ msg: "MultiQrcode atualizada com sucesso", status: "success", data: result, error: null });
              }else{
                res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
              }
            })
        }else{
          res.send({ msg: "Não existe multi qrcode com esse id: " + req.params.id + ".", status: "fail", data: null, error: null });
        }
      }).catch(error => {
        res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
      })
    } catch (error) {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    }
  }
} 
 