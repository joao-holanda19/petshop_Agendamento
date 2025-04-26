const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(403).json({ message: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.userId; // 👈 aqui injeta o ID
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
