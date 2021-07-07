const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// router.get('', datasetController.getall);
// router.get('/:id', datasetController.getDataFile);
// router.get('/:id/download', datasetController.setDownloadDataset);
<<<<<<< Updated upstream
 router.post('', usersController.setUser);
=======
router.get('', usersController.allUsers);
router.get('/:id', usersController.oneUser);
router.post('', usersController.setUser);
router.post('/login', usersController.login);
router.delete('/:id', usersController.removeUser);
router.put('/:id', usersController.updateUser);
>>>>>>> Stashed changes

module.exports = router
