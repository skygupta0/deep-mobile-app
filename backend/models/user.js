'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING(100), allowNull: true, field: 'first_name' },
    lastName: { type: DataTypes.STRING(100), allowNull: true, field: 'last_name' },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
    phoneNumber: { type: DataTypes.STRING(20), allowNull: true, field: 'phone_number' },
    isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_admin' }
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: true
  });

  return User;
};
