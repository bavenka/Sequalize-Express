import Reservation from '../models/Reservation';

export const createReservation = (reservationInfo) => {
  return Reservation.create(reservationInfo)
    .catch(e => {
        throw e;
    })
};
