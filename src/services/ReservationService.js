import Reservation from '../models/Reservation';
import User from '../models/User';
import {ERROR_TYPES} from "../server-error/constants";
import ErrorBase from "../server-error";
import connect from "../database/connect";


const {
  sequelize,
} = connect;

export const createReservation = async (userId, reservationInfo) => {
  const transaction = await sequelize.transaction();
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      transaction,
    });

    if (!user) {
      throw new ErrorBase(ERROR_TYPES.USER_IS_NOT_EXISTS, 409, `User with id = ${userId} is not exists.`);
    }

    const reservation = await Reservation.create(reservationInfo, {transaction});

    const createdReservation = await user.addReservation(reservation, {
      transaction
    });

    await transaction.commit();

    return createdReservation;
  } catch (e) {
    await transaction.rollback();
    throw e;
  }
};

export const getReservationsByUserId = async (userId) => {
  const transaction = await sequelize.transaction();

  try {
    const user = await User.findOne({
      where: {
        id:userId,
      },
      transaction,
    });

    if (!user) {
      throw new ErrorBase(ERROR_TYPES.USER_IS_NOT_EXISTS, 409, `User with id = ${userId} is not exists.`);
    }

    const userReservations = await user.getReservations({
      transaction
    });

    await transaction.commit();

    return userReservations;
  } catch (e) {
    await transaction.rollback();
    throw e;
  }
};

export const editReservation = async (userId, reservationInfo) => {
  const transaction = await sequelize.transaction();

  try {
    const user = await User.findOne({
      where: {
        id:userId,
      },
      transaction,
    });

    if (!user) {
      throw new ErrorBase(ERROR_TYPES.USER_IS_NOT_EXISTS, 409, `User with id = ${userId} is not exists.`);
    }

    const updatedReservation = Reservation.update(
      {  status: reservationInfo.status,
        peopleCount: reservationInfo.peopleCount,
        phoneNumber: reservationInfo.phoneNumber,
      },
      {
        returning: true,
        where: {
          id: reservationInfo.id,
        }
      }
    );

    await transaction.commit();
    return updatedReservation;

  } catch (e) {
    await transaction.rollback();
    throw e;
  }
};

export const deleteReservation = (id) => {
  return Reservation.destroy({
    where: {
      id
    }
  })
};

export const getAllReservations = () => Reservation.findAll();



