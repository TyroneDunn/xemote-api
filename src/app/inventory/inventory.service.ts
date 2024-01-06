import { InventoryRepository } from "./inventory-repository.type";
import {
   GetInventoryRecordRequest,
   InventoryRecord,
   InventoryRecordsRequest,
   UpdateInventoryRecordRequest,
   UpdateInventoryRecordsRequest,
} from "./inventory-records.type";
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
   RequestHandler,
   Response,
   ValidationError,
} from "@hals/common";
import {
   mapInventoryRecordsToSuccessResponse,
   mapInventoryRecordToSuccessResponse,
   mapRequestToGetInventoryRecordRequest,
   mapRequestToInventoryRecordsRequest,
   mapRequestToUpdateInventoryRecordRequest,
   mapRequestToUpdateInventoryRecordsRequest,
} from "./inventory-records.utility";
import { InventoryRecordsValidator } from "./inventory-records.validator";

export type InventoryService = {
   getRecord : RequestHandler,
   getRecords : RequestHandler,
   updateRecord : RequestHandler,
   updateRecords : RequestHandler,
};

export const InventoryService = (
   repository: InventoryRepository,
   validator: InventoryRecordsValidator,
): InventoryService => ({
   getRecord: async (request: Request): Promise<Response> => {
      const dto: GetInventoryRecordRequest = mapRequestToGetInventoryRecordRequest(request);
      const validationOutcome: ValidationError | null = await validator.validateGetInventoryRecordRequest(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: InventoryRecord | Error = await repository.getRecord(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapInventoryRecordToSuccessResponse(result);
   },

   getRecords: async (request: Request): Promise<Response> => {
      const dto: InventoryRecordsRequest = mapRequestToInventoryRecordsRequest(request);
      const validationOutcome: ValidationError | null = await validator.validateInventoryRecordsRequest(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: InventoryRecord[] | Error = await repository.getRecords(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      const response : Response = mapInventoryRecordsToSuccessResponse(result);
      if (dto.page !== undefined) return addPageDataToResponse(dto.page, response);
      else return response;
   },

   updateRecord: async (request: Request): Promise<Response> => {
      const dto: UpdateInventoryRecordRequest = mapRequestToUpdateInventoryRecordRequest(request);
      const validationOutcome: ValidationError | null = await validator.validateUpdateInventoryRecordRequest(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: InventoryRecord | Error = await repository.updateRecord(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapInventoryRecordToSuccessResponse(result);
   },

   updateRecords: async (request: Request): Promise<Response> => {
      const dto: UpdateInventoryRecordsRequest = mapRequestToUpdateInventoryRecordsRequest(request);
      const validationOutcome: ValidationError | null = await validator.validateUpdateInventoryRecordsRequest(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: CommandResult | Error = await repository.updateRecords(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapCommandResultToSuccessResponse(result);
   },
});
