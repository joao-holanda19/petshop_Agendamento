const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const upload = require('../middleware/uploadMiddleware');

router.post('/', upload.single('image'), petController.createPet);

module.exports = router;
