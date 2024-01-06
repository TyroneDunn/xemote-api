import { Order } from "./order.type";
import {
   CreateOrderDTO,
   DeleteOrderDTO,
   GetOrderDTO,
   OrdersDTO,
   UpdateOrderDTO,
   UpdateOrdersDTO,
} from "./orders-dtos.type";
import { CommandResult, Error } from "@hals/common";

export type OrdersRepository = {
   getOrder: GetOrder,
   getOrders: GetOrders,
   createOrder: CreateOrder,
   updateOrder: UpdateOrder,
   updateOrders: UpdateOrders,
   deleteOrder: DeleteOrder,
   deleteOrders: DeleteOrders,
   exists: (dto: GetOrderDTO) => Promise<boolean | Error>,
};

export type GetOrder = (dto : GetOrderDTO) => Promise<Order | Error>;
export type GetOrders = (dto : OrdersDTO) => Promise<Order[] | Error>;
export type CreateOrder = (dto : CreateOrderDTO) => Promise<Order | Error>;
export type UpdateOrder = (dto : UpdateOrderDTO) => Promise<Order | Error>;
export type UpdateOrders = (dto : UpdateOrdersDTO) => Promise<CommandResult | Error>;
export type DeleteOrder = (dto : DeleteOrderDTO) => Promise<CommandResult | Error>;
export type DeleteOrders = (dto : OrdersDTO) => Promise<CommandResult | Error>;
