import { InventoryRepository } from "./inventory-repository.type";
import {
   InventoryRecord,
   UpdateInventoryRecordRequest,
   UpdateInventoryRecordsRequest,
} from "./inventory-records.type";
import {
   CommandResult,
   Error,
   handleRequest,
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
   getInventoryRecordAndMapResultToResponse,
   getRecordsAndMapResultToResponse,
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
   getRecord: async (request: Request): Promise<Response> => handleRequest(
      mapRequestToGetInventoryRecordRequest(request),
      validator.validateGetInventoryRecordRequest,
      getInventoryRecordAndMapResultToResponse(repository.getRecord),
   ),

   getRecords: async (request: Request): Promise<Response> => handleRequest(
      mapRequestToInventoryRecordsRequest(request),
      validator.validateInventoryRecordsRequest,
      getRecordsAndMapResultToResponse(repository.getRecords),
   ),

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
