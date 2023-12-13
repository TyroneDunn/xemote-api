import {Order, OrderStatus, ProductCount} from "./order.type";
import {Schema} from "mongoose";
import database from "../environment/mongoose-database";

export interface OrdersDocument extends Document, Order {
    clientId: string,
    cart: ProductCount,
    status: OrderStatus,
}

const OrderSchema = new Schema({
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
        required: true
    }
});

const OrdersModel = database.model<OrdersDocument>('orders', OrderSchema);
export default OrdersModel;