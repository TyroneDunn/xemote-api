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
   getOrder: (dto: GetOrderDTO) => Promise<Order | Error>,
   getOrders: (dto: OrdersDTO) => Promise<Order[] | Error>,
   createOrder: (dto: CreateOrderDTO) => Promise<Order | Error>,
   updateOrder: (dto: UpdateOrderDTO) => Promise<Order | Error>,
   updateOrders: (dto: UpdateOrdersDTO) => Promise<CommandResult | Error>,
   deleteOrder: (dto: DeleteOrderDTO) => Promise<CommandResult | Error>,
   deleteOrders: (dto: OrdersDTO) => Promise<CommandResult | Error>,
   exists: (dto: GetOrderDTO) => Promise<boolean | Error>,
};
