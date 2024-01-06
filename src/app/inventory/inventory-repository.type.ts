import {
   CreateInventoryRecordRequest,
   DeleteInventoryRecordRequest,
   GetInventoryRecordRequest,
   InventoryRecord,
   InventoryRecordsRequest,
   UpdateInventoryRecordRequest,
   UpdateInventoryRecordsRequest,
} from "./inventory-records.type";
import { CommandResult, Error } from "@hals/common";
import { Either } from '../../shared/either.type';

export type InventoryRepository = {
   getRecord : GetRecord,
   getRecords : GetRecords,
   createRecord : CreateRecord,
   updateRecord : UpdateRecord,
   updateRecords : UpdateRecords,
   deleteRecord : DeleteRecord,
   deleteRecords : DeleteRecords,
   exists : (request : GetInventoryRecordRequest) => Promise<boolean | Error>,
};

export type GetRecord = (request : GetInventoryRecordRequest) => Promise<InventoryRecord | Error>;
export type GetRecords = (request : InventoryRecordsRequest) => Promise<InventoryRecord[] | Error>;
export type CreateRecord = (request : CreateInventoryRecordRequest) => Promise<InventoryRecord | Error>;
export type UpdateRecord = (request : UpdateInventoryRecordRequest) => Promise<InventoryRecord | Error>;
export type UpdateRecords = (request : UpdateInventoryRecordsRequest) => Promise<Either<Error, CommandResult>>;
export type DeleteRecord = (request : DeleteInventoryRecordRequest) => Promise<Either<Error, CommandResult>>;
export type DeleteRecords = (request : InventoryRecordsRequest) => Promise<Either<Error, CommandResult>>;
