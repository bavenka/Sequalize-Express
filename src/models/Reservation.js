import connect from '../database/connect';
import Role from './Role';

const {
  sequelize,
  Sequelize
} = connect;

const Reservation = sequelize.define('reservation', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  time: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  peopleCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps:false
});

export default Reservation;
