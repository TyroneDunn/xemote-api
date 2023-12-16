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
import {DeleteResult} from "mongodb";

export const MongoOrdersRepository: OrdersRepository = {
    getOrder: (dto: GetOrderDTO): Promise<Order> => OrdersModel.findById(dto._id),

    getOrders: (dto: OrdersDTO): Promise<Order[]> => {
        const filter = mapOrdersDtoToFilter(dto);
        const query = OrdersModel.find(filter);
        if (dto.sort !== undefined)
            query.sort({[dto.sort.field]: dto.sort.order === 'asc' ? 1 : -1});
        if (dto.page !== undefined) {
            query.skip(dto.page.index * dto.page.limit);
            query.limit(dto.page.limit);
        }
        return query.exec();
    },

    createOrder: (dto: CreateOrderDTO): Promise<Order> =>
        new OrdersModel({
            clientId: dto.clientId,
            cart: dto.cart,
            status: dto.status,
        }).save(),

    updateOrder(dto: UpdateOrderDTO): Promise<Order> {
        return Promise.resolve(undefined);
    },
    updateOrders(dto: UpdateOrdersDTO): Promise<CommandResult> {
        return Promise.resolve(undefined);
    },

    deleteOrder: async (dto: DeleteOrderDTO): Promise<CommandResult> => {
        const result: DeleteResult = await OrdersModel.deleteOne({_id: dto._id});
        return {success: result.acknowledged, affectedCount: result.deletedCount};
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

const mapOrdersDtoToFilter = (dto: OrdersDTO) => ({
    ...dto.filter.clientId && {clientId: dto.filter.clientId},
    ...dto.filter.productId && {productId: dto.filter.productId},
    ...dto.filter.status && {status: dto.filter.status},
    ...dto.filter.countRange && {
        ...(dto.filter.countRange.start && !dto.filter.countRange.end) && {count: {$gt: dto.filter.countRange.start}},
        ...(!dto.filter.countRange.start && dto.filter.countRange.end) && {count: {$lt: dto.filter.countRange.end}},
        ...(dto.filter.countRange.start && dto.filter.countRange.end) && {
            count: {
                $gt: dto.filter.countRange.start,
                $lt: dto.filter.countRange.end
            }
        },
    },
    ...dto.timestamps && {
        ...dto.timestamps.createdAt && {
            ...(dto.timestamps.createdAt.start && !dto.timestamps.createdAt.end) && {
                createdAt: {$gt: dto.timestamps.createdAt.start}
            },
            ...(!dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) && {
                createdAt: {$lt: dto.timestamps.createdAt.end}
            },
            ...(dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) && {
                createdAt: {$gt: dto.timestamps.createdAt.start, $lt: dto.timestamps.createdAt.end}
            }
        },
        ...dto.timestamps.updatedAt && {
            ...(dto.timestamps.updatedAt.start && !dto.timestamps.updatedAt.end) && {
                updatedAt: {$gt: dto.timestamps.updatedAt.start}
            },
            ...(!dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) && {
                updatedAt: {$lt: dto.timestamps.updatedAt.end}
            },
            ...(dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) && {
                updatedAt: {$gt: dto.timestamps.updatedAt.start, $lt: dto.timestamps.updatedAt.end}
            }
        }
    },
});
