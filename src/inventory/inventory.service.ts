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
import {Request, Response} from "@hals/core";
import {ValidationOutcome} from "../shared/validate/validation-dtos.type";
import {mapToErrorResponse} from "../shared/validate/validation-dtos.utility";
import {InventoryRecord} from "./inventory-record.type";
import {
    mapInventoryRecordsToSuccessResponse,
    mapInventoryRecordToSuccessResponse,
    mapRequestToInventoryRecordsDTO,
    mapToGetInventoryRecordDTO
} from "./inventory-records-dtos.utility";
import {validateGetInventoryRecordDTO} from "./inventory-records-dtos-validator.service";
import {
    addRequestPageDataToResponse,
    mapToInternalServerErrorResponse
} from "../shared/hals.utility";

const repository: InventoryRepository = INVENTORY_REPOSITORY;

export const getRecord = async (request: Request): Promise<Response> => {
    const dto: GetInventoryRecordDTO = mapToGetInventoryRecordDTO(request);

    const validationOutcome: ValidationOutcome = await validateGetInventoryRecordDTO(dto);
    if (validationOutcome.error !== undefined) return mapToErrorResponse(validationOutcome);

    try {
        const record: InventoryRecord = await repository.getRecord(dto);
        return mapInventoryRecordToSuccessResponse(record);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
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
