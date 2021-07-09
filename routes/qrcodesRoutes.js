const express = require('express');
const router = express.Router();
const qrcodesController = require('../controllers/qrcodesController');

// router.get('/:id/download', datasetController.setDownloadDataset);
// router.get('/:id', usersController.oneUser);
// router.post('', usersController.setUser);

router.post('', qrcodesController.saveQrCode);
router.get('/user/:userId', qrcodesController.getQrCodeByUser);
router.get('', qrcodesController.getAllQrCode);
router.get('/:id', qrcodesController.getOneQrCode);
router.delete('/:id', qrcodesController.deleteQrCode);
router.put('/:id', qrcodesController.updateQrCode);

module.exports = router
