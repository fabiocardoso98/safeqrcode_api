const express = require('express');
const router = express.Router();
const foldersController = require('../controllers/foldersController');

router.post('', foldersController.createFolder);
router.get('', foldersController.getAll);
router.get('/qrcodes', foldersController.getFolderAndQrCodeByUser);
router.get('/users', foldersController.getFolderByUser);
router.get('/:id', foldersController.getOneFolder);
router.post('/qrcodes', foldersController.setFolderQrcodes);

module.exports = router
