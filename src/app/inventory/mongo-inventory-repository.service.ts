import { InventoryRepository } from "./inventory-repository.type";
import {
   CreateInventoryRecordDTO,
   DeleteInventoryRecordDTO,
   GetInventoryRecordDTO,
   InventoryRecordsDTO,
   InventoryRecordUpdateFields,
   UpdateInventoryRecordDTO,
   UpdateInventoryRecordsDTO,
} from "./inventory-records-dtos.type";
import { InventoryRecord } from "./inventory-record.type";
import InventoryRecordsModel from "./mongo-inventory-records-model.type";
import { DeleteResult } from "mongodb";
import { UpdateWriteOpResult } from "mongoose";
import { CommandResult, Error } from "@hals/common";

export const MongoInventoryRepository: InventoryRepository = {
   getRecord: async (dto: GetInventoryRecordDTO): Promise<InventoryRecord | Error> => {
      try {
         const record: InventoryRecord | null = await InventoryRecordsModel.findOne({ productId: dto.productId });
         if (!record) return { type: "NotFound", message: 'Inventory record not found.' };
         return record;
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   getRecords: async (dto: InventoryRecordsDTO): Promise<InventoryRecord[] | Error> => {
      try {
         const filter = mapDTOToFilter(dto);
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
         return { type: "Internal", message: (error as Error).message };
      }
   },

   createRecord: (dto: CreateInventoryRecordDTO): Promise<InventoryRecord> =>
      new InventoryRecordsModel({
         productId: dto.productId,
         count: dto.count,
      }).save(),

   updateRecord: (dto: UpdateInventoryRecordDTO): Promise<InventoryRecord> =>
      InventoryRecordsModel.findOneAndUpdate(
         { productId: dto.productId },
         mapUpdateFieldsToUpdateQuery(dto.updateFields),
         { new: true },
      ),

   updateRecords: async (dto: UpdateInventoryRecordsDTO): Promise<CommandResult> => {
      const filter = mapUpdateInventoryRecordsDTOToFilter(dto);
      const query = mapUpdateFieldsToUpdateQuery(dto.updateFields);
      const result: UpdateWriteOpResult = await InventoryRecordsModel.updateMany(filter, query);
      return { success: result.acknowledged, affectedCount: result.modifiedCount };
   },

   deleteRecord: async (dto: DeleteInventoryRecordDTO): Promise<CommandResult> => {
      const result: DeleteResult = await InventoryRecordsModel.deleteOne({ productId: dto.productId });
      return { success: result.acknowledged, affectedCount: result.deletedCount };
   },

   deleteRecords: async (dto: InventoryRecordsDTO): Promise<CommandResult> => {
      const filter = mapDTOToFilter(dto);
      const result: DeleteResult = await InventoryRecordsModel.deleteMany(filter);
      return { success: result.acknowledged, affectedCount: result.deletedCount };
   },

   exists: async (dto: GetInventoryRecordDTO): Promise<boolean> => {
      try {
         const record: InventoryRecord = await InventoryRecordsModel.findOne({ productId: dto.productId });
         return !!record;
      }
      catch (error) {
         return false;
      }
   },
};

const mapDTOToFilter = (dto: InventoryRecordsDTO) => ({
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

const mapUpdateFieldsToUpdateQuery = (updateFields: InventoryRecordUpdateFields) => ({
   ...updateFields.newCount && { count: updateFields.newCount },
   ...updateFields.countDelta && { $inc: { count: updateFields.countDelta } },
});

const mapUpdateInventoryRecordsDTOToFilter = (dto: UpdateInventoryRecordsDTO) => ({
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
