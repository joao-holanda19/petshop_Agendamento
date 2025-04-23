const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Pet', {
    pet_name: DataTypes.STRING,
    breed: DataTypes.STRING,
    appointment_date: DataTypes.DATE,
    notes: DataTypes.TEXT,
    image_path: DataTypes.STRING
  });
};
