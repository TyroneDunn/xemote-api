import {InventoryRepository} from "./inventory-repository.type";
import {INVENTORY_REPOSITORY} from "../environment/repositories-config";
import {
    CreateInventoryRecordDTO,
    DeleteInventoryRecordDTO,
    GetInventoryRecordDTO,
    InventoryRecordsDTO,
    UpdateInventoryRecordDTO,
    UpdateInventoryRecordsDTO,
} from "./inventory-records-dtos.type";
import {InventoryRecord} from "./inventory-record.type";
import {Result} from "../shared/result.type";

const repository: InventoryRepository = INVENTORY_REPOSITORY;

export const getRecord = (dto: GetInventoryRecordDTO): Promise<InventoryRecord> => {

};

export const getRecords = (dto: InventoryRecordsDTO): Promise<InventoryRecord[]> => {

};

export const createRecord = (dto: CreateInventoryRecordDTO): Promise<InventoryRecord> => {

};

export const updateRecord = (dto: UpdateInventoryRecordDTO): Promise<InventoryRecord> => {

};

export const updateRecords = (dto: UpdateInventoryRecordsDTO): Promise<Result> => {

};

export const deleteRecord = (dto: DeleteInventoryRecordDTO): Promise<Result> => {

};

export const deleteRecords = (dto: InventoryRecordsDTO): Promise<Result> => {

};
