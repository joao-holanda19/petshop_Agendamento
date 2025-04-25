const { Sequelize } = require('sequelize');
const UserModel = require('./User');
const PetModel = require('./Pet');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

const User = UserModel(sequelize);
const Pet = PetModel(sequelize);

User.hasMany(Pet, { foreignKey: 'user_id' });
Pet.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { sequelize, User, Pet };

