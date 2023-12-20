import { InventoryRecord } from "./inventory-record.type";
import {
   CreateInventoryRecordDTO,
   DeleteInventoryRecordDTO,
   GetInventoryRecordDTO,
   InventoryRecordsDTO,
   UpdateInventoryRecordDTO,
   UpdateInventoryRecordsDTO,
} from "./inventory-records-dtos.type";
import { CommandResult, Error } from "@hals/common";

export type InventoryRepository = {
   getRecord: (dto: GetInventoryRecordDTO) => Promise<InventoryRecord | Error>,
   getRecords: (dto: InventoryRecordsDTO) => Promise<InventoryRecord[] | Error>,
   createRecord: (dto: CreateInventoryRecordDTO) => Promise<InventoryRecord | Error>,
   updateRecord: (dto: UpdateInventoryRecordDTO) => Promise<InventoryRecord | Error>,
   updateRecords: (dto: UpdateInventoryRecordsDTO) => Promise<CommandResult | Error>,
   deleteRecord: (dto: DeleteInventoryRecordDTO) => Promise<CommandResult | Error>,
   deleteRecords: (dto: InventoryRecordsDTO) => Promise<CommandResult | Error>,
   exists: (dto: GetInventoryRecordDTO) => Promise<boolean | Error>,
};
