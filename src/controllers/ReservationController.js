import * as reservationService from '../services/ReservationService';


export const saveReservation = (req, res, next) => {
  const userId = req.params.userId;
  reservationService
    .createReservation(userId, req.body)
    .then(data => res.status(201).json(data))
    .catch(e => {
      next(e)
    })
};

export const getReservations = (req, res, next) => {
  const userId = req.params.userId;
  reservationService
    .getReservationsByUserId(userId)
    .then(data => res.status(201).json(data))
    .catch(e => {
      next(e)
    })
};
