const { Pet } = require('../models');

exports.getAllPets = async (req, res) => {
  try {
    console.log('UserID recebido:', req.userId); // 👈 Veja no terminal se userId aparece
    const pets = await Pet.findAll({
      where: { user_id: req.userId }
    });
    res.json(pets);
  } catch (error) {
    console.error('Erro ao buscar pets:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createPet = async (req, res) => {
  try {
    const { pet_name, breed, appointment_date, notes } = req.body;
    const image_path = req.file ? req.file.filename : null;

    const newPet = await Pet.create({
      user_id: req.userId,
      pet_name,
      breed,
      appointment_date,
      notes,
      image_path
    });

    res.status(201).json(newPet);
  } catch (error) {
    console.error('Erro ao criar pet:', error);
    res.status(500).json({ error: error.message });
  }
};
