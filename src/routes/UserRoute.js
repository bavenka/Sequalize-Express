import express from 'express';
import validate from 'express-validation';
import { RoleType} from '../models/enums/RoleType';

import userValidator from '../validators/UserValidator';
import reservationValidator from '../validators/ReservationValidator';

import { verifyToken  } from '../services/TokenService';
import { verifyRole  } from '../services/RoleService';
import * as userController from '../controllers/UserController';
import * as cartController from '../controllers/CartController';
import * as wishListController from '../controllers/WishListController';
import * as reservationController from '../controllers/ReservationController';

const userRoute = express.Router();

/*verifyToken, (req, res, next) => verifyRole(req, res, next, RoleType.ADMIN)*/

userRoute.post('/create', validate(userValidator.createUser), userController.saveUser);

userRoute.post(
  '/:userId/reservation/create',
  validate(reservationValidator.createReservation),
  reservationController.saveReservation
);

userRoute.put(
  '/:userId/reservation/update',
  validate(reservationValidator.updateReservation),
  reservationController.updateReservation
);

userRoute.get(
  '/:userId/reservations',
  validate(reservationValidator.getReservations),
  reservationController.getReservations
);

userRoute.put(
  '/:userId/edit',
  validate(userValidator.editUser),
  userController.updateUser
);

userRoute.post(
  '/:userId/shoppingCart/products/:productId',
  cartController.addProductToCart
);

userRoute.get(
  '/:userId/shoppingCart',
  cartController.getCartProductsByUserId
);

userRoute.delete(
  '/:userId/shoppingCart/products/:productId/delete',
  cartController.deleteProductFromCart
);

userRoute.delete(
  '/:userId/shoppingCart/clear',
  cartController.clearProductsCart
);

userRoute.post(
  '/:userId/wishList/products/:productId',
  wishListController.addProductToWishList
);

userRoute.get(
  '/:userId/wishList',
  wishListController.getWishListByUserId
);

userRoute.delete(
  '/:userId/wishList/products/:productId/delete',
  wishListController.deleteProductFromWishList
);

userRoute.delete(
  '/:userId/wishList/clear',
  wishListController.clearWishList
);

userRoute.put(
  '/:userId/wishList/products/:productId/move',
  wishListController.moveProductToCartFromWishList
);


userRoute.delete('/:userId/delete', validate(userValidator.deleteUser), userController.deleteUser);

export default userRoute;
