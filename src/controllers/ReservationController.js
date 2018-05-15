import * as reservationService from '../services/ReservationService';


export const saveReservation = (req, res, next) => {
  reservationService
    .createReservation(req.body)
    .then(data => res.status(201).json(data))
    .catch(e => {
      next(e)
    })
};
