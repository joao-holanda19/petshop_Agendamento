const { Pet } = require('../models');

exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.findAll({
            where: { user_id: req.userId }
        });
        res.json(pets);

        exports.getAllPets = async (req, res) => {
            try {
                console.log("UserID recebido:", req.userId); // 👈 adicione isso
                const pets = await Pet.findAll({
                    where: { user_id: req.userId }
                });
                res.json(pets);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: error.message });
            }
        };
        
    } catch (error) {
        console.error(error); // 👈 Logar o erro é importante para ver no terminal
        res.status(500).json({ error: error.message });
    }
};
