const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// router.get('', datasetController.getall);
// router.get('/:id', datasetController.getDataFile);
// router.get('/:id/download', datasetController.setDownloadDataset);
 router.post('', usersController.setUser);
 router.post('/login', usersController.login);

module.exports = router
