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
    mapRequestToUpdateInventoryRecordsDTO,
    mapToCreateInventoryRecordDTO,
    mapToDeleteInventoryRecordDTO,
    mapToDeleteInventoryRecordsDTO,
    mapToGetInventoryRecordDTO,
    mapToUpdateInventoryRecordDTO
} from "./inventory-records-dtos.utility";
import {
    validateCreateInventoryRecordDTO,
    validateDeleteInventoryRecordDTO,
    validateDeleteInventoryRecordsDTO,
    validateGetInventoryRecordDTO,
    validateGetInventoryRecordsDTO,
    validateUpdateInventoryRecordDTO,
    validateUpdateInventoryRecordsDTO
} from "./inventory-records-dtos-validator.service";
import {
    addRequestPageDataToResponse,
    mapToInternalServerErrorResponse
} from "../shared/hals.utility";
import {Result} from "../shared/result.type";
import {mapResultToSuccessResponse} from "../shared/result.utility";

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

export const getRecords = async (request: Request): Promise<Response> => {
    const dto: InventoryRecordsDTO = mapRequestToInventoryRecordsDTO(request);

    const validationOutcome: ValidationOutcome = await validateGetInventoryRecordsDTO(dto);
    if (validationOutcome.error !== undefined) return mapToErrorResponse(validationOutcome);

    try {
        const records: InventoryRecord[] = await repository.getRecords(dto);

        const addPageData = (response: Response): Response =>
            addRequestPageDataToResponse(request, response);
        return addPageData(mapInventoryRecordsToSuccessResponse(records));
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const createRecord = async (request: Request): Promise<Response> => {
    const dto: CreateInventoryRecordDTO = mapToCreateInventoryRecordDTO(request);

    const validationOutcome: ValidationOutcome = await validateCreateInventoryRecordDTO(dto);
    if (validationOutcome.error !== undefined) return mapToErrorResponse(validationOutcome);

    try {
        const record: InventoryRecord = await repository.createRecord(dto);
        return mapInventoryRecordToSuccessResponse(record);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const updateRecord = async (request: Request): Promise<Response> => {
    const dto: UpdateInventoryRecordDTO = mapToUpdateInventoryRecordDTO(request);

    const validationOutcome: ValidationOutcome = await validateUpdateInventoryRecordDTO(dto);
    if (validationOutcome.error !== undefined) return mapToErrorResponse(validationOutcome);

    try {
        const record: InventoryRecord = await repository.updateRecord(dto);
        return mapInventoryRecordToSuccessResponse(record);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const updateRecords = async (request: Request): Promise<Response> => {
    const dto: UpdateInventoryRecordsDTO = mapRequestToUpdateInventoryRecordsDTO(request);

    const validationOutcome: ValidationOutcome = await validateUpdateInventoryRecordsDTO(dto);
    if (validationOutcome.error !== undefined) return mapToErrorResponse(validationOutcome);

    try {
        const result: Result = await repository.updateRecords(dto);
        return mapResultToSuccessResponse(result);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const deleteRecord = async (request: Request): Promise<Response> => {
    const dto: DeleteInventoryRecordDTO = mapToDeleteInventoryRecordDTO(request);

    const validationOutcome: ValidationOutcome = await validateDeleteInventoryRecordDTO(dto);
    if (validationOutcome.error !== undefined) return mapToErrorResponse(validationOutcome);

    try {
        const result: Result = await repository.deleteRecord(dto);
        return mapResultToSuccessResponse(result);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const deleteRecords = async (request: Request): Promise<Response> => {
    const dto: InventoryRecordsDTO = mapToDeleteInventoryRecordsDTO(request);

    const validationOutcome: ValidationOutcome = await validateDeleteInventoryRecordsDTO(dto);
    if (validationOutcome.error !== undefined) return mapToErrorResponse(validationOutcome);

    try {
        const result: Result = await repository.deleteRecords(dto);
        return mapResultToSuccessResponse(result);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};
