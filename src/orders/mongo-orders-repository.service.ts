import {OrdersRepository} from "./orders-repository.type";
import {
    CreateOrderDTO,
    DeleteOrderDTO,
    GetOrderDTO,
    OrdersDTO,
    UpdateOrderDTO, UpdateOrdersDTO
} from "./orders-dtos.type";
import {Order} from "./order.type";
import {CommandResult} from "../shared/command-result/command-result.type";
import OrdersModel from "./mongo-orders-model.type";

export const MongoOrdersRepository: OrdersRepository = {
    getOrder(dto: GetOrderDTO): Promise<Order> {
        return Promise.resolve(undefined);
    },
    getOrders(dto: OrdersDTO): Promise<Order[]> {
        return Promise.resolve([]);
    },
    createOrder(dto: CreateOrderDTO): Promise<Order> {
        return Promise.resolve(undefined);
    },
    updateOrder(dto: UpdateOrderDTO): Promise<Order> {
        return Promise.resolve(undefined);
    },
    updateOrders(dto: UpdateOrdersDTO): Promise<CommandResult> {
        return Promise.resolve(undefined);
    },
    deleteOrder(dto: DeleteOrderDTO): Promise<CommandResult> {
        return Promise.resolve(undefined);
    },
    deleteOrders(dto: OrdersDTO): Promise<CommandResult> {
        return Promise.resolve(undefined);
    },
    exists: async (dto: GetOrderDTO): Promise<boolean> => {
        try {
            const order: Order = await OrdersModel.findById(dto._id);
            return !!order;
        } catch (error) {
            return false;
        }
    }
};