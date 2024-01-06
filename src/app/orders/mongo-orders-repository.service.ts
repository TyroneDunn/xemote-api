import { OrdersRepository } from "./orders-repository.type";
import {
   CreateOrderRequest,
   DeleteOrderRequest,
   GetOrderRequest,
   OrdersRequest,
   OrderUpdateFields,
   UpdateOrderRequest,
   UpdateOrdersRequest,
} from "./orders.type";
import { Order } from "./order.type";
import OrdersModel from "./mongo-orders-model.type";
import { DeleteResult } from "mongodb";
import { UpdateWriteOpResult } from "mongoose";
import { CommandResult, Error } from "@hals/common";

export const MongoOrdersRepository: OrdersRepository = {
   getOrder: async (dto: GetOrderRequest): Promise<Order | Error> => {
      try {
         const order: Order | null = await OrdersModel.findById(dto._id);
         if (!order) return Error("NotFound", 'Order not found.');
         return order;
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },

   getOrders: async (dto: OrdersRequest): Promise<Order[] | Error> => {
      try {
         const filter = mapOrdersRequestToOrdersFilter(dto);
         const query = OrdersModel.find(filter);
         if (dto.sort !== undefined)
            query.sort({ [dto.sort.field]: dto.sort.order === 'asc' ? 1 : -1 });
         if (dto.page !== undefined) {
            query.skip(dto.page.index * dto.page.limit);
            query.limit(dto.page.limit);
         }
         return query.exec();
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },

   createOrder: async (dto: CreateOrderRequest): Promise<Order | Error> => {
      try {
         return new OrdersModel({
            clientId: dto.clientId,
            cart: dto.cart,
            status: dto.status,
         }).save();
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },

   updateOrder: async (dto: UpdateOrderRequest): Promise<Order | Error> => {
      try {
         const order: Order | null = await OrdersModel.findOneAndUpdate(
            { _id: dto._id },
            mapUpdateFieldsToUpdateQuery(dto.updateFields),
            { new: true },
         );
         if (!order) return Error("NotFound", 'Order not found.');
         return order;
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },

   updateOrders: async (dto: UpdateOrdersRequest): Promise<CommandResult | Error> => {
      try {
         const filter = mapUpdateOrdersRequestToOrdersFilter(dto);
         const updateQuery = mapUpdateFieldsToUpdateQuery(dto.updateFields);
         const updateResult: UpdateWriteOpResult = await OrdersModel.updateMany(filter, updateQuery);
         return CommandResult(updateResult.acknowledged, updateResult.modifiedCount);
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },

   deleteOrder: async (dto: DeleteOrderRequest): Promise<CommandResult | Error> => {
      try {
         const result: DeleteResult = await OrdersModel.deleteOne({ _id: dto._id });
         return CommandResult(result.acknowledged, result.deletedCount);
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },

   deleteOrders: async (dto: OrdersRequest): Promise<CommandResult | Error> => {
      try {
         const filter = mapOrdersRequestToOrdersFilter(dto);
         const result: DeleteResult = await OrdersModel.deleteMany(filter);
         return CommandResult(result.acknowledged, result.deletedCount);
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },

   exists: async (dto: GetOrderRequest): Promise<boolean | Error> => {
      try {
         const order: Order | null = await OrdersModel.findById(dto._id);
         return !!order;
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },
};

const mapOrdersRequestToOrdersFilter = (dto: OrdersRequest) => ({
   ...dto.filter && {
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

const mapUpdateOrdersRequestToOrdersFilter = (dto: UpdateOrdersRequest) => ({
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
