import { OrdersRepository } from "./orders-repository.type";
import {
   CreateOrderDTO,
   DeleteOrderDTO,
   GetOrderDTO,
   OrdersDTO,
   OrderUpdateFields,
   UpdateOrderDTO,
   UpdateOrdersDTO,
} from "./orders-dtos.type";
import { Order } from "./order.type";
import OrdersModel from "./mongo-orders-model.type";
import { DeleteResult } from "mongodb";
import { UpdateWriteOpResult } from "mongoose";
import { CommandResult, Error } from "@hals/common";

export const MongoOrdersRepository: OrdersRepository = {
   getOrder: async (dto: GetOrderDTO): Promise<Order | Error> => {
      try {
         const order: Order | null = await OrdersModel.findById(dto._id);
         if (!order) return { type: "NotFound", message: 'Order not found.' };
         return order;
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   getOrders: (dto: OrdersDTO): Promise<Order[]> => {
      const filter = mapOrdersDtoToFilter(dto);
      const query = OrdersModel.find(filter);
      if (dto.sort !== undefined)
         query.sort({ [dto.sort.field]: dto.sort.order === 'asc' ? 1 : -1 });
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

   updateOrder: (dto: UpdateOrderDTO): Promise<Order> =>
      OrdersModel.findOneAndUpdate(
         { _id: dto._id },
         mapUpdateFieldsToUpdateQuery(dto.updateFields),
         { new: true },
      ),

   updateOrders: async (dto: UpdateOrdersDTO): Promise<CommandResult> => {
      const filter = mapUpdateOrdersDtoToFilter(dto);
      const updateQuery = mapUpdateFieldsToUpdateQuery(dto.updateFields);
      const updateResult: UpdateWriteOpResult = await OrdersModel.updateMany(filter, updateQuery);
      return { success: updateResult.acknowledged, affectedCount: updateResult.modifiedCount };
   },

   deleteOrder: async (dto: DeleteOrderDTO): Promise<CommandResult> => {
      const result: DeleteResult = await OrdersModel.deleteOne({ _id: dto._id });
      return { success: result.acknowledged, affectedCount: result.deletedCount };
   },

   deleteOrders: async (dto: OrdersDTO): Promise<CommandResult> => {
      const filter = mapOrdersDtoToFilter(dto);
      const result: DeleteResult = await OrdersModel.deleteMany(filter);
      return { success: result.acknowledged, affectedCount: result.deletedCount };
   },

   exists: async (dto: GetOrderDTO): Promise<boolean> => {
      try {
         const order: Order = await OrdersModel.findById(dto._id);
         return !!order;
      }
      catch (error) {
         return false;
      }
   },
};

const mapOrdersDtoToFilter = (dto: OrdersDTO) => ({
   ...dto.filter.clientId && { clientId: dto.filter.clientId },
   ...dto.filter.productId && { productId: dto.filter.productId },
   ...dto.filter.status && { status: dto.filter.status },
   ...dto.filter.countRange && {
      ...(dto.filter.countRange.start && !dto.filter.countRange.end) &&
      { count: { $gte: dto.filter.countRange.start } },
      ...(!dto.filter.countRange.start && dto.filter.countRange.end) &&
      { count: { $lte: dto.filter.countRange.end } },
      ...(dto.filter.countRange.start && dto.filter.countRange.end) && {
         count: {
            $gte: dto.filter.countRange.start,
            $lte: dto.filter.countRange.end,
         },
      },
   },
   ...dto.timestamps && {
      ...dto.timestamps.createdAt && {
         ...(dto.timestamps.createdAt.start && !dto.timestamps.createdAt.end) &&
         { createdAt: { $gte: dto.timestamps.createdAt.start } },
         ...(!dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) &&
         { createdAt: { $lte: dto.timestamps.createdAt.end } },
         ...(dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) && {
            createdAt: {
               $gte: dto.timestamps.createdAt.start,
               $lte: dto.timestamps.createdAt.end,
            },
         },
      },
      ...dto.timestamps.updatedAt && {
         ...(dto.timestamps.updatedAt.start && !dto.timestamps.updatedAt.end) &&
         { updatedAt: { $gte: dto.timestamps.updatedAt.start } },
         ...(!dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) &&
         { updatedAt: { $lte: dto.timestamps.updatedAt.end } },
         ...(dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) && {
            updatedAt: {
               $gte: dto.timestamps.updatedAt.start,
               $lte: dto.timestamps.updatedAt.end,
            },
         },
      },
   },
});

const mapUpdateFieldsToUpdateQuery = (updateFields: OrderUpdateFields) => ({
   ...updateFields.newStatus && { status: updateFields.newStatus },
   ...updateFields.newCart && { cart: updateFields.newCart },
});

const mapUpdateOrdersDtoToFilter = (dto: UpdateOrdersDTO) => ({
   ...dto.filter.clientId && { clientId: dto.filter.clientId },
   ...dto.filter.productId && { productId: dto.filter.productId },
   ...dto.filter.status && { status: dto.filter.status },
   ...dto.filter.countRange && {
      ...(dto.filter.countRange.start && !dto.filter.countRange.end) &&
      { count: { $gte: dto.filter.countRange.start } },
      ...(!dto.filter.countRange.start && dto.filter.countRange.end) &&
      { count: { $lte: dto.filter.countRange.end } },
      ...(dto.filter.countRange.start && dto.filter.countRange.end) && {
         count: {
            $gte: dto.filter.countRange.start,
            $lte: dto.filter.countRange.end,
         },
      },
   },
   ...dto.timestamps && {
      ...dto.timestamps.createdAt && {
         ...(dto.timestamps.createdAt.start && !dto.timestamps.createdAt.end) &&
         { createdAt: { $gte: dto.timestamps.createdAt.start } },
         ...(!dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) &&
         { createdAt: { $lte: dto.timestamps.createdAt.end } },
         ...(dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) && {
            createdAt: {
               $gte: dto.timestamps.createdAt.start,
               $lte: dto.timestamps.createdAt.end,
            },
         },
      },
      ...dto.timestamps.updatedAt && {
         ...(dto.timestamps.updatedAt.start && !dto.timestamps.updatedAt.end) &&
         { updatedAt: { $gte: dto.timestamps.updatedAt.start } },
         ...(!dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) &&
         { updatedAt: { $lte: dto.timestamps.updatedAt.end } },
         ...(dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) && {
            updatedAt: {
               $gte: dto.timestamps.updatedAt.start,
               $lte: dto.timestamps.updatedAt.end,
            },
         },
      },
   },
});
