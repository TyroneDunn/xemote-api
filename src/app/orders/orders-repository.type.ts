import { Order } from "./order.type";
import {
   CreateOrderRequest,
   DeleteOrderRequest,
   GetOrderRequest,
   OrdersRequest,
   UpdateOrderRequest,
   UpdateOrdersRequest,
} from "./orders.type";
import { CommandResult, Error } from "@hals/common";

export type OrdersRepository = {
   getOrder : GetOrder,
   getOrders : GetOrders,
   createOrder : CreateOrder,
   updateOrder : UpdateOrder,
   updateOrders : UpdateOrders,
   deleteOrder : DeleteOrder,
   deleteOrders : DeleteOrders,
   exists : (dto : GetOrderRequest) => Promise<boolean | Error>,
};

export type GetOrder = (dto : GetOrderRequest) => Promise<Order | Error>;
export type GetOrders = (dto : OrdersRequest) => Promise<Order[] | Error>;
export type CreateOrder = (dto : CreateOrderRequest) => Promise<Order | Error>;
export type UpdateOrder = (dto : UpdateOrderRequest) => Promise<Order | Error>;
export type UpdateOrders = (dto : UpdateOrdersRequest) => Promise<CommandResult | Error>;
export type DeleteOrder = (dto : DeleteOrderRequest) => Promise<CommandResult | Error>;
export type DeleteOrders = (dto : OrdersRequest) => Promise<CommandResult | Error>;
