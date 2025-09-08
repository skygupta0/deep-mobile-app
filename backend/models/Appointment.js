'use strict';
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ticketNumber: { type: DataTypes.STRING(30), unique: true, allowNull: false, field: 'ticket_number' },
    customerQueryId: { type: DataTypes.INTEGER, allowNull: true, field: 'customer_query_id' },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    timeSlot: { type: DataTypes.STRING(50), allowNull: false, field: 'time_slot' },
    pickupRequired: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'pickup_required' },
    status: { type: DataTypes.STRING(20), defaultValue: 'PENDING' }
  }, {
    tableName: 'appointments',
    underscored: true,
    timestamps: true
  });

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.CustomerQuery, { foreignKey: 'customerQueryId', as: 'customerQuery' });
  };

  // ===== FIXED HOOK =====
  Appointment.beforeValidate(async (appointment, options) => {
  const year = new Date().getFullYear();

  const lastAppointment = await Appointment.findOne({
    where: sequelize.Sequelize.where(
      sequelize.Sequelize.fn('EXTRACT', sequelize.Sequelize.literal('YEAR FROM "created_at"')),
      year
    ),
    order: [['created_at', 'DESC']]
  });

  let seq = 1;
  if (lastAppointment && lastAppointment.ticketNumber) {
    const lastSeq = parseInt(lastAppointment.ticketNumber.split('-').pop());
    seq = lastSeq + 1;
  }

  appointment.ticketNumber = `DEEP-${year}-${String(seq).padStart(5, '0')}`;
});



  return Appointment;
};
