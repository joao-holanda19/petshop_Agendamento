// --- IMPORTAÇÕES ---
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const { verifyToken } = require('./middleware/authMiddleware');

// --- INICIAR EXPRESS ---
const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// --- ROTAS ---
app.use('/api/auth', authRoutes);
app.use('/api/pets', verifyToken, petRoutes);

// --- CONEXÃO COM BANCO ---
sequelize.sync().then(() => {
    console.log('Database synced');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}).catch(err => {
    console.error('Erro de conexão com banco de dados:', err);
});
