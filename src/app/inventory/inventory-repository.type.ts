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
   getRecord: GetRecord,
   getRecords: GetRecords,
   createRecord: CreateRecord,
   updateRecord: UpdateRecord,
   updateRecords: UpdateRecords,
   deleteRecord: DeleteRecord,
   deleteRecords: DeleteRecords,
   exists: (dto: GetInventoryRecordDTO) => Promise<boolean | Error>,
};

export type GetRecord = (request : GetInventoryRecordDTO) => Promise<InventoryRecord | Error>;
export type GetRecords = (request : InventoryRecordsDTO) => Promise<InventoryRecord[] | Error>;
export type CreateRecord = (request : CreateInventoryRecordDTO) => Promise<InventoryRecord | Error>;
export type UpdateRecord = (request : UpdateInventoryRecordDTO) => Promise<InventoryRecord | Error>;
export type UpdateRecords = (request : UpdateInventoryRecordsDTO) => Promise<CommandResult | Error>;
export type DeleteRecord = (request : DeleteInventoryRecordDTO) => Promise<CommandResult | Error>;
export type DeleteRecords = (request : InventoryRecordsDTO) => Promise<CommandResult | Error>;
