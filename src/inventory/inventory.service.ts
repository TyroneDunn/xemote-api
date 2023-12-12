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
import {Response} from "@hals/core";

const repository: InventoryRepository = INVENTORY_REPOSITORY;

export const getRecord = (dto: GetInventoryRecordDTO): Promise<Response> => {

};

export const getRecords = (dto: InventoryRecordsDTO): Promise<Response> => {

};

export const createRecord = (dto: CreateInventoryRecordDTO): Promise<Response> => {

};

export const updateRecord = (dto: UpdateInventoryRecordDTO): Promise<Response> => {

};

export const updateRecords = (dto: UpdateInventoryRecordsDTO): Promise<Response> => {

};

export const deleteRecord = (dto: DeleteInventoryRecordDTO): Promise<Response> => {

};

export const deleteRecords = (dto: InventoryRecordsDTO): Promise<Response> => {

};
