const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Pet', {
    pet_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false
    },
    appointment_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT
    },
    image_path: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  });
};
