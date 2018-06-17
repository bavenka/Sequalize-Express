import User from "../models/User";
import OrderProduct from '../models/OrderProduct';
import Order from '../models/Order';
import ErrorBase from "../server-error";
import {ERROR_TYPES} from "../server-error/constants";
import connect from "../database/connect";
import Cart from "../models/Cart";
import Product from "../models/Product";

const {
  sequelize,
} = connect;

export const orderProducts = async (userId, orderInfo) => {
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

    const { date, time, address, phoneNumber, name, email, products } = orderInfo;

    const order = await Order.create({
      date, time, address, phoneNumber, name, email,
    }, { transaction });

    await user.addOrder(order, {
      transaction,
    });

    const orderProducts = await OrderProduct.bulkCreate(products.map(product => ({
      quantity: product.quantity,
      totalPrice: product.totalPrice,
      productId: product.id,
      orderId: order.id,
    })),
      { returning: true, transaction });

    await Cart.destroy({
      where: {
        userId,
      },
      transaction,
    });

    await transaction.commit();
    return orderProducts;

  } catch (e) {
    await transaction.rollback();
    throw e;
  }
};

export const getOrdersByUserId = async (userId) => {
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

    return user.getOrders({
      include: [
        {
          model: OrderProduct,
          as: 'OrderProducts',
          include: [Product],
          required: true,
        }
      ]
    });

  } catch (e) {
    await transaction.rollback();
    throw e;
  }
};
