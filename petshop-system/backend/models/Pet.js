const Pet = require('../models/Pet');
const fs = require('fs');
const path = require('path');

exports.createPet = async (req, res) => {
    try {
        const { pet_name, breed, appointment_date, notes } = req.body;
        const imagePath = req.file ? req.file.path : null;
        
        const pet = new Pet({
            user_id: req.userId,
            pet_name,
            breed,
            appointment_date,
            notes,
            image_path: imagePath
        });
        
        await pet.save();
        res.status(201).json(pet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Implement other CRUD operations similarly...