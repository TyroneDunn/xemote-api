import {Order} from "./order.type";
import {
    CreateOrderDTO,
    DeleteOrderDTO,
    GetOrderDTO,
    OrdersDTO,
    UpdateOrderDTO,
    UpdateOrdersDTO
} from "./orders-dtos.type";
import {CommandResult} from "@hals/common";

export type OrdersRepository = {
    getOrder: (dto: GetOrderDTO) => Promise<Order>,
    getOrders: (dto: OrdersDTO) => Promise<Order[]>,
    createOrder: (dto: CreateOrderDTO) => Promise<Order>,
    updateOrder: (dto: UpdateOrderDTO) => Promise<Order>,
    updateOrders: (dto: UpdateOrdersDTO) => Promise<CommandResult>,
    deleteOrder: (dto: DeleteOrderDTO) => Promise<CommandResult>,
    deleteOrders: (dto: OrdersDTO) => Promise<CommandResult>,
    exists: (dto: GetOrderDTO) => Promise<boolean>,
};
