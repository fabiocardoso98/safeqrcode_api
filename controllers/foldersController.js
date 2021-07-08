const { folders, qrcodes } = require('../models');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const Op = Sequelize.Op;
var fs = require('fs');
const config = require('../config.js');

module.exports = {
  createFolder(req, res) {
    try {
      folders.create(req.body).then(result => {
        if(result) {
          res.send({ msg: "Pasta criada com sucesso", status: "success", data: result, error: null });
        }else{
          res.send({ msg: "Pasta não criada, tente mais tarde", status: "fail", data: null, error: null });
        }
      }).catch(error => { 
        res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado", status: "error", data: null, error: error });
      });
    } catch (error) {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado", status: "error", data: null, error: error });
    }
  },
  setFolderQrcodes(req, res) {
    var arrQrcodes = req.body.qrcodeId.split(',');
    folders.findByPk(req.body.folderId).then(folder => {
      arrQrcodes.forEach(qrcodeId => {
        qrcodes.findByPk(qrcodeId).then(qrcode => {
          folder.addQrcodes(qrcode).then(results => {
          }).catch(error => {
            console.log(error);
          })
        }).catch(error => {
          console.log(error);
        });
      })
    }).catch(error => {
      console.log(error);
    });
    res.send({ msg: "Qrcodes adicionado na pasta", status: "success", data: null, error: null });
    
  },
  getFolderByUser(req, res) {
    folders.findAll({ where: { userId: req.params.userId }, includes: qrcodes }).then(result => {
      if(result) {
        res.send({ msg: "Pastas encontradas com sucesso", status: "success", data: result, error: null });
      }else{
        res.send({ msg: "Não existe essa pasta.", status: "fail", data: null, error: null });
      }
    }).catch(error => {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    })
  },
  getFolderAndQrCodeByUser(req, res) {
    folders.findAll({ where: { userId: req.body.userId }, include: [{model: qrcodes, through: { attributes: [] }}] }).then(result => {
      if(result) {
        res.send({ msg: "Pastas encontradas com sucesso", status: "success", data: result, error: null });
      }else{
        res.send({ msg: "Não existe essa pasta.", status: "fail", data: null, error: null });
      }
    }).catch(error => {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    })
  },
  getAll(req, res) {
    folders.findAll().then(result => {
      if(result) {
        res.send({ msg: "Pastas encontradas com sucesso", status: "success", data: result, error: null });
      }else{
        res.send({ msg: "Não existe essa pasta.", status: "fail", data: null, error: null });
      }
    }).catch(error => {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    })
  },
  getOneFolder(req, res) {
    folders.findByPk(req.params.id).then(result => {
      if(result) {
        res.send({ msg: "Pasta encontrada com sucesso", status: "success", data: result, error: null });
      }else{
        res.send({ msg: "Não existe essa pasta com esse id: " + req.params.id + ".", status: "fail", data: null, error: null });
      }
    }).catch(error => {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    })
  },
  removeFolder(req, res) {
    try {
      folders.destroy({ where: { [Op.and]: [{  id: req.params.folderId }, { userId: req.params.userId }]  } }).then(result => {
        if(result) {
          res.send({ msg: "Pasta eliminada com sucesso", status: "success", data: null, error: null });
        }else{
          res.send({ msg: "Não existe essa pasta com esse id: " + req.params.folderId + ".", status: "fail", data: null, error: null });
        }
      }).catch(error => {
        res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
      })
    } catch (error) {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    }
  },
  updateFolder(req, res) {
    try {
      folders.findByPk(req.params.id).then(folder=> {
        if(folder) {
          folder.update(req.body).then(result=> {
              if(result) {
                res.send({ msg: "Pasta atualizada com sucesso", status: "success", data: result, error: null });
              }else{
                res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
              }
            })
        }else{
          res.send({ msg: "Não existe utilizador com esse id: " + req.params.id + ".", status: "fail", data: null, error: null });
        }
      }).catch(error => {
        res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
      })
    } catch (error) {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    }
  }
} 
 