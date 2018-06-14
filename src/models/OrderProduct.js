import connect from '../database/connect';
import { OrderType} from "./enums/OrderType";

const {
  sequelize,
  Sequelize,
} = connect;

const OrderProduct = sequelize.define('order_product', {
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: OrderType.IN_PROCESSING,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
}, {
  timestamps:false
});


export default OrderProduct;
