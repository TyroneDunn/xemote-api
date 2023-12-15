import {InventoryRepository} from "./inventory-repository.type";
import {
    CreateInventoryRecordDTO,
    DeleteInventoryRecordDTO, GetInventoryRecordDTO,
    InventoryRecordsDTO, UpdateInventoryRecordDTO, UpdateInventoryRecordsDTO
} from "./inventory-records-dtos.type";
import {InventoryRecord} from "./inventory-record.type";
import {Result} from "../shared/result.type";

export const MongoInventoryRepository: InventoryRepository = {
    getRecord: (dto: GetInventoryRecordDTO): Promise<InventoryRecord> => {},

    getRecords: (dto: InventoryRecordsDTO): Promise<InventoryRecord[]> => {},

    createRecord: (dto: CreateInventoryRecordDTO): Promise<InventoryRecord> => {},

    updateRecord: (dto: UpdateInventoryRecordDTO): Promise<InventoryRecord> => {},

    updateRecords: (dto: UpdateInventoryRecordsDTO): Promise<Result> => {},

    deleteRecord: (dto: DeleteInventoryRecordDTO): Promise<Result> => {},

    deleteRecords: (dto: InventoryRecordsDTO): Promise<Result> => {},

    exists: (dto: GetInventoryRecordDTO): Promise<boolean> => {}
};
