import { InventoryRecord } from "./inventory-record.type";
import {
   CreateInventoryRecordDTO,
   DeleteInventoryRecordDTO,
   GetInventoryRecordDTO,
   InventoryRecordsDTO,
   UpdateInventoryRecordDTO,
   UpdateInventoryRecordsDTO,
} from "./inventory-records-dtos.type";
import { CommandResult } from "@hals/common";

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
