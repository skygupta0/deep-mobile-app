'use strict';
module.exports = (sequelize, DataTypes) => {
  const CustomerQuery = sequelize.define('CustomerQuery', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING(100), allowNull: false, field: 'first_name' },
    lastName: { type: DataTypes.STRING(100), allowNull: false, field: 'last_name' },
    phoneNumber: { type: DataTypes.STRING(20), allowNull: false, field: 'phone_number' },
    deviceModel: { type: DataTypes.STRING(120), allowNull: false, field: 'device_model' },
    issueDescription: { type: DataTypes.TEXT, allowNull: false, field: 'issue_description' }
  }, {
    tableName: 'customer_queries',
    underscored: true,
    timestamps: true
  });

  return CustomerQuery;
};
