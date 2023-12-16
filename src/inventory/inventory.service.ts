import {InventoryRepository} from "./inventory-repository.type";
import {
    CreateInventoryRecordDTO,
    DeleteInventoryRecordDTO,
    GetInventoryRecordDTO,
    InventoryRecordsDTO,
    UpdateInventoryRecordDTO,
    UpdateInventoryRecordsDTO,
} from "./inventory-records-dtos.type";
import {Request, Response} from "@hals/core";
import {ValidationOutcome} from "../shared/validation-outcome/validation-outcome.type";
import {
    mapValidationOutcomeToErrorResponse
} from "../shared/validation-outcome/validation-outcome.utility";
import {InventoryRecord} from "./inventory-record.type";
import {
    mapInventoryRecordsToSuccessResponse,
    mapInventoryRecordToSuccessResponse,
    mapRequestToCreateInventoryRecordDTO,
    mapRequestToDeleteInventoryRecordDTO,
    mapRequestToGetInventoryRecordDTO,
    mapRequestToInventoryRecordsDTO,
    mapRequestToUpdateInventoryRecordDTO,
    mapRequestToUpdateInventoryRecordsDTO
} from "./inventory-records-dtos.utility";
import {addRequestPageDataToResponse} from "../shared/hals/hals.utility";
import {CommandResult} from "../shared/command-result/command-result.type";
import {mapCommandResultToSuccessResponse} from "../shared/command-result/command-result.utility";
import {mapToInternalServerErrorResponse} from "../shared/errors/errors.utility";
import {InventoryRecordsDtosValidator} from "./inventory-records-dtos-validator.utility";

export type InventoryService = {
    getRecord: (request: Request) => Promise<Response>,
    getRecords: (request: Request) => Promise<Response>,
    createRecord: (request: Request) => Promise<Response>,
    updateRecord: (request: Request) => Promise<Response>,
    updateRecords: (request: Request) => Promise<Response>,
    deleteRecord: (request: Request) => Promise<Response>,
    deleteRecords: (request: Request) => Promise<Response>,
};

export const configureInventoryService = (
    repository: InventoryRepository,
    validator: InventoryRecordsDtosValidator
): InventoryService => ({
    getRecord: async (request: Request): Promise<Response> => {
        const dto: GetInventoryRecordDTO = mapRequestToGetInventoryRecordDTO(request);

        const validationOutcome: ValidationOutcome = await validator.validateGetInventoryRecordDto(dto);
        if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

        try {
            const record: InventoryRecord = await repository.getRecord(dto);
            return mapInventoryRecordToSuccessResponse(record);
        } catch (error) {
            return mapToInternalServerErrorResponse(error);
        }
    },

    getRecords: async (request: Request): Promise<Response> => {
        const dto: InventoryRecordsDTO = mapRequestToInventoryRecordsDTO(request);

        const validationOutcome: ValidationOutcome = await validator.validateInventoryRecordsDto(dto);
        if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

        try {
            const records: InventoryRecord[] = await repository.getRecords(dto);

            const addPageData = (response: Response): Response =>
                addRequestPageDataToResponse(request, response);
            return addPageData(mapInventoryRecordsToSuccessResponse(records));
        } catch (error) {
            return mapToInternalServerErrorResponse(error);
        }
    },

    createRecord: async (request: Request): Promise<Response> => {
        const dto: CreateInventoryRecordDTO = mapRequestToCreateInventoryRecordDTO(request);

        const validationOutcome: ValidationOutcome = await validator.validateCreateInventoryRecordDto(dto);
        if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

        try {
            const record: InventoryRecord = await repository.createRecord(dto);
            return mapInventoryRecordToSuccessResponse(record);
        } catch (error) {
            return mapToInternalServerErrorResponse(error);
        }
    },

    updateRecord: async (request: Request): Promise<Response> => {
        const dto: UpdateInventoryRecordDTO = mapRequestToUpdateInventoryRecordDTO(request);

        const validationOutcome: ValidationOutcome = await validator.validateUpdateInventoryRecordDto(dto);
        if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

        try {
            const record: InventoryRecord = await repository.updateRecord(dto);
            return mapInventoryRecordToSuccessResponse(record);
        } catch (error) {
            return mapToInternalServerErrorResponse(error);
        }
    },

    updateRecords: async (request: Request): Promise<Response> => {
        const dto: UpdateInventoryRecordsDTO = mapRequestToUpdateInventoryRecordsDTO(request);

        const validationOutcome: ValidationOutcome = await validator.validateUpdateInventoryRecordsDto(dto);
        if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

        try {
            const result: CommandResult = await repository.updateRecords(dto);
            return mapCommandResultToSuccessResponse(result);
        } catch (error) {
            return mapToInternalServerErrorResponse(error);
        }
    },

    deleteRecord: async (request: Request): Promise<Response> => {
        const dto: DeleteInventoryRecordDTO = mapRequestToDeleteInventoryRecordDTO(request);

        const validationOutcome: ValidationOutcome = await validator.validateDeleteInventoryRecordDto(dto);
        if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

        try {
            const result: CommandResult = await repository.deleteRecord(dto);
            return mapCommandResultToSuccessResponse(result);
        } catch (error) {
            return mapToInternalServerErrorResponse(error);
        }
    },

    deleteRecords: async (request: Request): Promise<Response> => {
        const dto: InventoryRecordsDTO = mapRequestToInventoryRecordsDTO(request);

        const validationOutcome: ValidationOutcome = await validator.validateInventoryRecordsDto(dto);
        if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

        try {
            const result: CommandResult = await repository.deleteRecords(dto);
            return mapCommandResultToSuccessResponse(result);
        } catch (error) {
            return mapToInternalServerErrorResponse(error);
        }
    },
});
