const express = require('express');
const router = express.Router();
const foldersController = require('../controllers/foldersController');

router.post('', foldersController.createFolder);
router.get('', foldersController.getAll);
router.get('/qrcodes', foldersController.getFolderAndQrCodeByUser);
router.get('/users/:userId', foldersController.getFolderByUser);
router.get('/:id', foldersController.getOneFolder);
router.post('/qrcodes', foldersController.setFolderQrcodes);
router.delete('/:folderId/:userId', foldersController.removeFolder);
router.put('/:id', foldersController.updateFolder);

module.exports = router
