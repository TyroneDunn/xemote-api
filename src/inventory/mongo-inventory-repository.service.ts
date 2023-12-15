import {InventoryRepository} from "./inventory-repository.type";
import {
    CreateInventoryRecordDTO,
    DeleteInventoryRecordDTO, GetInventoryRecordDTO,
    InventoryRecordsDTO, UpdateInventoryRecordDTO, UpdateInventoryRecordsDTO
} from "./inventory-records-dtos.type";
import {InventoryRecord} from "./inventory-record.type";
import {Result} from "../shared/result.type";
import InventoryRecordsModel from "./mongo-inventory-records-model.type";
import {DeleteResult} from "mongodb";

export const MongoInventoryRepository: InventoryRepository = {
    getRecord: (dto: GetInventoryRecordDTO): Promise<InventoryRecord> =>
        InventoryRecordsModel.findById(dto._id),

    getRecords: (dto: InventoryRecordsDTO): Promise<InventoryRecord[]> => {},

    createRecord: (dto: CreateInventoryRecordDTO): Promise<InventoryRecord> =>
        new InventoryRecordsModel({
            productId: dto.productId,
            count: dto.count,
        }).save(),

    updateRecord: (dto: UpdateInventoryRecordDTO): Promise<InventoryRecord> => {},

    updateRecords: (dto: UpdateInventoryRecordsDTO): Promise<Result> => {},

    deleteRecord: async (dto: DeleteInventoryRecordDTO): Promise<Result> => {
        const result: DeleteResult = await InventoryRecordsModel.deleteOne({_id: dto._id});
        return {success: result.acknowledged, affectedCount: result.deletedCount};
    },

    deleteRecords: (dto: InventoryRecordsDTO): Promise<Result> => {},

    exists: (dto: GetInventoryRecordDTO): Promise<boolean> => {}
};
