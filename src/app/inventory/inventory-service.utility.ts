import { InventoryRepository } from "./inventory-repository.type";
import {
   GetInventoryRecordDTO,
   InventoryRecordsDTO,
   UpdateInventoryRecordDTO,
   UpdateInventoryRecordsDTO,
} from "./inventory-records-dtos.type";
import {
   addPageDataToResponse,
   CommandResult,
   Error,
   isError,
   isValidationError,
   mapCommandResultToSuccessResponse,
   mapErrorToInternalServerErrorResponse,
   mapValidationErrorToErrorResponse,
   Request,
   Response,
   ValidationError,
} from "@hals/common";
import { InventoryRecord } from "./inventory-record.type";
import {
   mapInventoryRecordsToSuccessResponse,
   mapInventoryRecordToSuccessResponse,
   mapRequestToGetInventoryRecordDTO,
   mapRequestToInventoryRecordsDTO,
   mapRequestToUpdateInventoryRecordDTO,
   mapRequestToUpdateInventoryRecordsDTO,
} from "./inventory-records-dtos.utility";
import { InventoryRecordsDtosValidator } from "./inventory-records-dtos-validator.utility";
import { InventoryService } from "./inventory-service.type";

export const configureInventoryService = (
   repository: InventoryRepository,
   validator: InventoryRecordsDtosValidator,
): InventoryService => ({
   getRecord: async (request: Request): Promise<Response> => {
      const dto: GetInventoryRecordDTO = mapRequestToGetInventoryRecordDTO(request);
      const validationOutcome: ValidationError | null = await validator.validateGetInventoryRecordDto(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: InventoryRecord | Error = await repository.getRecord(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapInventoryRecordToSuccessResponse(result);
   },

   getRecords: async (request: Request): Promise<Response> => {
      const dto: InventoryRecordsDTO = mapRequestToInventoryRecordsDTO(request);
      const validationOutcome: ValidationError | null = await validator.validateInventoryRecordsDto(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: InventoryRecord[] | Error = await repository.getRecords(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      const addPageData = (response: Response): Response =>
         addPageDataToResponse(request, response);
      return addPageData(mapInventoryRecordsToSuccessResponse(result));
   },

   updateRecord: async (request: Request): Promise<Response> => {
      const dto: UpdateInventoryRecordDTO = mapRequestToUpdateInventoryRecordDTO(request);
      const validationOutcome: ValidationError | null = await validator.validateUpdateInventoryRecordDto(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: InventoryRecord | Error = await repository.updateRecord(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapInventoryRecordToSuccessResponse(result);
   },

   updateRecords: async (request: Request): Promise<Response> => {
      const dto: UpdateInventoryRecordsDTO = mapRequestToUpdateInventoryRecordsDTO(request);
      const validationOutcome: ValidationError | null = await validator.validateUpdateInventoryRecordsDto(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: CommandResult | Error = await repository.updateRecords(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapCommandResultToSuccessResponse(result);
   },
});
