import { Schema } from "mongoose";
import database from "../../database/mongodb.config";
import { Order, OrderStatus, ProductCount } from './orders.type';

export interface OrdersDocument extends Document, Order {
   clientId: string,
   cart: ProductCount,
   status: OrderStatus,
}

const OrderSchema = new Schema(
   {
      clientId: {
         type: Schema.Types.ObjectId,
         ref: "UserSchema",
         required: true,
      },
      cart: {
         type: Object,
         required: true,
      },
      status: {
         type: String,
         required: true,
      },
   },
   { timestamps: true },
);

const OrdersModel = database.model<OrdersDocument>('orders', OrderSchema);
export default OrdersModel;
