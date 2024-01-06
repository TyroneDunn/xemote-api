import { InventoryRepository } from "./inventory-repository.type";
import {
   CreateInventoryRecordRequest,
   DeleteInventoryRecordRequest,
   GetInventoryRecordRequest,
   InventoryRecord,
   InventoryRecordsRequest,
   InventoryRecordUpdateFields,
   UpdateInventoryRecordRequest,
   UpdateInventoryRecordsRequest,
} from "./inventory-records.type";
import InventoryRecordsModel from "./mongo-inventory-records-model.type";
import { DeleteResult } from "mongodb";
import { UpdateWriteOpResult } from "mongoose";
import { CommandResult, Error } from "@hals/common";

export const MongoInventoryRepository : InventoryRepository = {
   getRecord: async (dto : GetInventoryRecordRequest) : Promise<InventoryRecord | Error> => {
      try {
         const record : InventoryRecord | null = await InventoryRecordsModel.findOne({ productId: dto.productId });
         if (!record) return Error("NotFound", 'Inventory record not found.');
         return record;
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },

   getRecords: async (dto : InventoryRecordsRequest) : Promise<InventoryRecord[] | Error> => {
      try {
         const filter = mapInventoryRecordsRequestToFilter(dto);
         const query = InventoryRecordsModel.find(filter);
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

   createRecord: async (dto : CreateInventoryRecordRequest) : Promise<InventoryRecord | Error> => {
      try {
         return new InventoryRecordsModel({
            productId: dto.productId,
            count    : dto.count,
         }).save();
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },

   updateRecord: async (dto : UpdateInventoryRecordRequest) : Promise<InventoryRecord | Error> => {
      try {
         const record : InventoryRecord | null = await InventoryRecordsModel.findOneAndUpdate(
            { productId: dto.productId },
            mapInventoryRecordsUpdateFieldsToUpdateQuery(dto.updateFields),
            { new: true },
         );
         if (!record) return Error("NotFound", 'Inventory record not found.');
         return record;
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },

   updateRecords: async (dto : UpdateInventoryRecordsRequest) : Promise<CommandResult | Error> => {
      try {
         const filter = mapUpdateInventoryRecordsRequestToFilter(dto);
         const query = mapInventoryRecordsUpdateFieldsToUpdateQuery(dto.updateFields);
         const result : UpdateWriteOpResult = await InventoryRecordsModel.updateMany(filter, query);
         return { success: result.acknowledged, affectedCount: result.modifiedCount };
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },

   deleteRecord: async (dto : DeleteInventoryRecordRequest) : Promise<CommandResult | Error> => {
      try {
         const result : DeleteResult = await InventoryRecordsModel.deleteOne({ productId: dto.productId });
         return { success: result.acknowledged, affectedCount: result.deletedCount };
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },

   deleteRecords: async (dto : InventoryRecordsRequest) : Promise<CommandResult | Error> => {
      try {
         const filter = mapInventoryRecordsRequestToFilter(dto);
         const result : DeleteResult = await InventoryRecordsModel.deleteMany(filter);
         return { success: result.acknowledged, affectedCount: result.deletedCount };
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },

   exists: async (dto : GetInventoryRecordRequest) : Promise<boolean | Error> => {
      try {
         const record : InventoryRecord | null = await InventoryRecordsModel.findOne({ productId: dto.productId });
         return !!record;
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },
};

const mapInventoryRecordsRequestToFilter = (request : InventoryRecordsRequest) => ({
   ...request.filter && {
      ...request.filter.countRange && {
         ...(request.filter.countRange.start && !request.filter.countRange.end) &&
         { count : { $gte: request.filter.countRange.start } },
         ...(!request.filter.countRange.start && request.filter.countRange.end) &&
         { count : { $lte : request.filter.countRange.end } },
         ...(request.filter.countRange.start && request.filter.countRange.end) && {
            count : {
               $gte : request.filter.countRange.start,
               $lte : request.filter.countRange.end,
            },
         },
      },
   },

   ...request.timestamps && {
      ...request.timestamps.createdAt && {
         ...(request.timestamps.createdAt.start && !request.timestamps.createdAt.end) &&
         { createdAt : { $gte : request.timestamps.createdAt.start } },
         ...(!request.timestamps.createdAt.start && request.timestamps.createdAt.end) &&
         { createdAt : { $lte : request.timestamps.createdAt.end } },
         ...(request.timestamps.createdAt.start && request.timestamps.createdAt.end) && {
            createdAt : {
               $gte : request.timestamps.createdAt.start,
               $lte : request.timestamps.createdAt.end,
            },
         },
      },

      ...request.timestamps.updatedAt && {
         ...(request.timestamps.updatedAt.start && !request.timestamps.updatedAt.end) &&
         { updatedAt : { $gte : request.timestamps.updatedAt.start } },
         ...(!request.timestamps.updatedAt.start && request.timestamps.updatedAt.end) &&
         { updatedAt : { $lte : request.timestamps.updatedAt.end } },
         ...(request.timestamps.updatedAt.start && request.timestamps.updatedAt.end) && {
            updatedAt : {
               $gte : request.timestamps.updatedAt.start,
               $lte : request.timestamps.updatedAt.end,
            },
         },
      },
   },
});

const mapInventoryRecordsUpdateFieldsToUpdateQuery = (updateFields : InventoryRecordUpdateFields) => ({
   ...updateFields.newCount && { count : updateFields.newCount },
   ...updateFields.countDelta && { $inc : { count : updateFields.countDelta } },
});

const mapUpdateInventoryRecordsRequestToFilter = (dto : UpdateInventoryRecordsRequest) => ({
   ...dto.filter.countRange && {
      ...(dto.filter.countRange.start && !dto.filter.countRange.end) &&
      { count : { $gte : dto.filter.countRange.start } },
      ...(!dto.filter.countRange.start && dto.filter.countRange.end) &&
      { count : { $lte : dto.filter.countRange.end } },
      ...(dto.filter.countRange.start && dto.filter.countRange.end) && {
         count : {
            $gte : dto.filter.countRange.start,
            $lte : dto.filter.countRange.end,
         },
      },
   },

   ...dto.timestamps && {
      ...dto.timestamps.createdAt && {
         ...(dto.timestamps.createdAt.start && !dto.timestamps.createdAt.end) &&
         { createdAt : { $gte : dto.timestamps.createdAt.start } },
         ...(!dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) &&
         { createdAt : { $lte : dto.timestamps.createdAt.end } },
         ...(dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) && {
            createdAt : {
               $gte : dto.timestamps.createdAt.start,
               $lte : dto.timestamps.createdAt.end,
            },
         },
      },

      ...dto.timestamps.updatedAt && {
         ...(dto.timestamps.updatedAt.start && !dto.timestamps.updatedAt.end) &&
         { updatedAt : { $gte : dto.timestamps.updatedAt.start } },
         ...(!dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) &&
         { updatedAt : { $lte : dto.timestamps.updatedAt.end } },
         ...(dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) && {
            updatedAt : {
               $gte: dto.timestamps.updatedAt.start,
               $lte: dto.timestamps.updatedAt.end,
            },
         },
      },
   },
});
