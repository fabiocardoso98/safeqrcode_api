const { qrcodes, folders } = require('../models');
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
    qrcodes.findAll({ where: { userId: req.params.userId }}).then(result => {
      if(result != 0) {
        res.send({ msg: "Qrcodes encontrados com sucesso", status: "success", data: result, error: null });
      }else{
        res.send({ msg: "Não existe qrcodes.", status: "success", data: null, error: null });
      }
    }).catch(error => {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    })
  },
  getQrCodeByFolder(req, res) {
    folders.findAll({ where: { id: req.params.id }, include: [{model: qrcodes, through: { attributes: [] }}]}).then( folders => {
      var temp = {
        id: 0,
        name: "",
        content: "",
        img: "",
        latlng: "",
        adress: "",
        createDate: "",
        updateDate: "",
        categoryId: 0,
        userId: 0,
        folderId: 0
      }
      var arrTemp = [];

      folders[0].qrcodes.forEach(qrcode => {
        console.log(folders[0].id)
        temp.id = qrcode.id,
        temp.name = qrcode.name,
        temp.content = qrcode.content,
        temp.img = qrcode.img,
        temp.latlng = qrcode.latlng,
        temp.adress = qrcode.adress,
        temp.createDate = qrcode.createDate,
        temp.updateDate = qrcode.updateDate,
        temp.categoryId = qrcode.categoryId,
        temp.userId = qrcode.userId,
        temp.folderId = folders[0].id
        arrTemp.push(temp);
        temp = {
          id: 0,
          name: "",
          content: "",
          img: "",
          latlng: "",
          adress: "",
          createDate: "",
          updateDate: "",
          categoryId: 0,
          userId: 0,
          folderId: 0
        }
      });

      res.send({ msg: "Qrcodes encontrados com sucesso", status: "success", data: arrTemp, error: null });
      
    }).catch(error => {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    })
  },
  deleteQrCode(req, res) {
    try {
      qrcodes.destroy({ where: {  id: req.params.id } }).then(result => {
        if(result) {
          res.send({ msg: "Qrcode eliminada com sucesso", status: "success", data: null, error: null });
        }else{
          res.send({ msg: "Não existe essa qrcode com esse id: " + req.params.folderId + ".", status: "fail", data: null, error: null });
        }
      }).catch(error => {
        res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
      })
    } catch (error) {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    }
  },
  updateQrCode(req, res) {
    try {
      qrcodes.findByPk(req.params.id).then(qrcode => {
        if(qrcode) {
          qrcode.update(req.body).then(result=> {
              if(result) {
                res.send({ msg: "Qrcode atualizada com sucesso", status: "success", data: result, error: null });
              }else{
                res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
              }
            })
        }else{
          res.send({ msg: "Não existe qrcode com esse id: " + req.params.id + ".", status: "fail", data: null, error: null });
        }
      }).catch(error => {
        res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
      })
    } catch (error) {
      res.send({ msg: "Aconteceu algum erro, tente mais tarde, obrigado.", status: "error", data: null, error: error });
    }
  }
} 
 