import {InventoryRecord} from "./inventory-record.type";
import {
    GetInventoryRecordDTO,
    InventoryRecordsDTO,
    CreateInventoryRecordDTO,
    UpdateInventoryRecordDTO,
    UpdateInventoryRecordsDTO,
    DeleteInventoryRecordDTO
} from "./inventory-records-dtos.type";
import {CommandResult} from "@hals/common";


// todo : functions should return either record or error. Find a way to implement this functional
//  pattern in a clean manner.
export type InventoryRepository = {
    getRecord: (dto: GetInventoryRecordDTO) => Promise<InventoryRecord>,
    getRecords: (dto: InventoryRecordsDTO) => Promise<InventoryRecord[]>,
    createRecord: (dto: CreateInventoryRecordDTO) => Promise<InventoryRecord>,
    updateRecord: (dto: UpdateInventoryRecordDTO) => Promise<InventoryRecord>,
    updateRecords: (dto: UpdateInventoryRecordsDTO) => Promise<CommandResult>,
    deleteRecord: (dto: DeleteInventoryRecordDTO) => Promise<CommandResult>,
    deleteRecords: (dto: InventoryRecordsDTO) => Promise<CommandResult>,
    exists: (dto: GetInventoryRecordDTO) => Promise<boolean>,
};
