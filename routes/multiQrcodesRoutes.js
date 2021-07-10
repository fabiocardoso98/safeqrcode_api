const express = require('express');
const router = express.Router();
const multiQrcodesController = require('../controllers/multiQrcodesController');

router.post('', multiQrcodesController.saveMultiQrCode);
router.get('/user/:userId', multiQrcodesController.getMultiQrCodeByUser);
router.get('/all', multiQrcodesController.getAllMultiQrCode);
router.get('/:id', multiQrcodesController.getOneMultiQrCode);
router.delete('/:id', multiQrcodesController.deleteMultiQrCode);
router.put('/:id', multiQrcodesController.updateMultiQrCode);

module.exports = router
