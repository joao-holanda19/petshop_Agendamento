const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const upload = require('../middleware/uploadMiddleware');

// Rota para criar um agendamento
router.post('/', upload.single('image'), petController.createPet);

// (Opcional) Rota para listar agendamentos
router.get('/', petController.getAllPets);

module.exports = router;
