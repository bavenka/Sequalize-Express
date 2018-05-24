import * as reservationService from '../services/ReservationService';
import * as productService from "../services/ProductService";


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

export const updateReservation = (req, res, next) => {
  const userId = req.params.userId;
  reservationService
    .editReservation(userId, req.body)
    .then(data => res.status(201).json(data))
    .catch(e => {
      next(e)
    })
};

export const getAllReservations = (req, res, next) => {
  reservationService
      .getAllReservations()
      .then(data => res.status(200).json(data))
      .catch(e => {
          next(e)
      })
};

export const deleteReservation = (req, res, next) => {
  const reservationId = req.params.reservationId;
  reservationService
    .deleteReservation(reservationId)
    .then(data => res.status(data ? 200 : 204).end())
    .catch(e => {
      next(e)
    })
};
