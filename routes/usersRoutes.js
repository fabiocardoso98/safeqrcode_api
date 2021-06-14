const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// router.get('/:id/download', datasetController.setDownloadDataset);
router.get('', usersController.allUsers);
router.get('/:id', usersController.oneUser);
router.post('', usersController.setUser);
router.post('/login', usersController.login);

module.exports = router
