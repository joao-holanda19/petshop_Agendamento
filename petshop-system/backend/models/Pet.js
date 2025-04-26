const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Pet', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
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
    tableName: 'Pets',
    timestamps: false
  });
};
