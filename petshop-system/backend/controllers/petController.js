const { Pet } = require('../models');

exports.getAllPets = async (req, res) => {
  try {
    console.log('UserID recebido:', req.userId); // 👈 Log para verificar
    const pets = await Pet.findAll({
      where: { user_id: req.userId }
    });
    res.json(pets);
  } catch (error) {
    console.error('Erro ao buscar pets:', error);
    res.status(500).json({ error: error.message });
  }
};