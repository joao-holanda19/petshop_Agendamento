const { Pet } = require('../models');

exports.createPet = async (req, res) => {
    try {
        const { pet_name, breed, appointment_date, notes } = req.body;
        const imagePath = req.file ? req.file.path : null;

        const pet = await Pet.create({
            user_id: req.userId,  // precisa pegar do token (authMiddleware)
            pet_name,
            breed,
            appointment_date,
            notes,
            image_path: imagePath
        });

        res.status(201).json(pet);
    } catch (error) {
        console.error(error); // importante logar o erro
        res.status(500).json({ error: error.message });
    }
};

exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.findAll({ where: { user_id: req.userId } });
        res.json(pets);
    } catch (error) {
        console.error(error); // importante logar o erro
        res.status(500).json({ error: error.message });
    }
};
