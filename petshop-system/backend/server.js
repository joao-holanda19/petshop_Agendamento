const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const { verifyToken } = require('./middleware/authMiddleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/pets', verifyToken, petRoutes);

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}).catch((err) => {
  console.error('Erro ao conectar com o banco de dados:', err);
});
