import { InventoryRepository } from "./inventory-repository.type";
import {
   GetInventoryRecordDTO,
   InventoryRecordsDTO,
   UpdateInventoryRecordDTO,
   UpdateInventoryRecordsDTO,
} from "./inventory-records-dtos.type";
import {
   addRequestPageDataToResponse,
   CommandResult,
   Error,
   isError,
   mapCommandResultToSuccessResponse,
   mapErrorToInternalServerErrorResponse,
   mapValidationOutcomeToErrorResponse,
   Request,
   Response,
   ValidationOutcome,
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
      const validationOutcome: ValidationOutcome = await validator.validateGetInventoryRecordDto(dto);
      if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);
      const result: InventoryRecord | Error = await repository.getRecord(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapInventoryRecordToSuccessResponse(result);
   },

   getRecords: async (request: Request): Promise<Response> => {
      const dto: InventoryRecordsDTO = mapRequestToInventoryRecordsDTO(request);
      const validationOutcome: ValidationOutcome = await validator.validateInventoryRecordsDto(dto);
      if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);
      const result: InventoryRecord[] | Error = await repository.getRecords(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      const addPageData = (response: Response): Response =>
         addRequestPageDataToResponse(request, response);
      return addPageData(mapInventoryRecordsToSuccessResponse(result));
   },

   updateRecord: async (request: Request): Promise<Response> => {
      const dto: UpdateInventoryRecordDTO = mapRequestToUpdateInventoryRecordDTO(request);
      const validationOutcome: ValidationOutcome = await validator.validateUpdateInventoryRecordDto(dto);
      if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);
      const result: InventoryRecord | Error = await repository.updateRecord(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapInventoryRecordToSuccessResponse(result);
   },

   updateRecords: async (request: Request): Promise<Response> => {
      const dto: UpdateInventoryRecordsDTO = mapRequestToUpdateInventoryRecordsDTO(request);

      const validationOutcome: ValidationOutcome = await validator.validateUpdateInventoryRecordsDto(dto);
      if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

      try {
         const result: CommandResult = await repository.updateRecords(dto);
         return mapCommandResultToSuccessResponse(result);
      }
      catch (error) {
         return mapErrorToInternalServerErrorResponse(error);
      }
   },
});
