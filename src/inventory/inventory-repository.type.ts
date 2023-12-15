import {InventoryRecord} from "./inventory-record.type";
import {
    GetInventoryRecordDTO,
    InventoryRecordsDTO,
    CreateInventoryRecordDTO,
    UpdateInventoryRecordDTO,
    UpdateInventoryRecordsDTO,
    DeleteInventoryRecordDTO
} from "./inventory-records-dtos.type";
import {Result} from "../shared/result.type";

export type InventoryRepository = {
    getRecord: (dto: GetInventoryRecordDTO) => Promise<InventoryRecord>,
    getRecords: (dto: InventoryRecordsDTO) => Promise<InventoryRecord[]>,
    createRecord: (dto: CreateInventoryRecordDTO) => Promise<InventoryRecord>,
    updateRecord: (dto: UpdateInventoryRecordDTO) => Promise<InventoryRecord>,
    updateRecords: (dto: UpdateInventoryRecordsDTO) => Promise<Result>,
    deleteRecord: (dto: DeleteInventoryRecordDTO) => Promise<Result>,
    deleteRecords: (dto: InventoryRecordsDTO) => Promise<Result>,
    exists: (dto: GetInventoryRecordDTO) => Promise<boolean>,
};
