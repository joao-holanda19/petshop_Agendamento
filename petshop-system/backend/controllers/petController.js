const { Pet } = require('../models');

exports.createPet = async (req, res) => {
    try {
        const { pet_name, breed, appointment_date, notes } = req.body;
        const imagePath = req.file ? req.file.path : null;

        const pet = await Pet.create({
            user_id: req.userId,
            pet_name,
            breed,
            appointment_date,
            notes,
            image_path: imagePath
        });

        res.status(201).json(pet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
