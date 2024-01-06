import { InventoryRepository } from "./inventory-repository.type";
import { handleRequest, Request, RequestHandler, Response } from "@hals/common";
import {
   getInventoryRecordAndMapResultToResponse,
   getRecordsAndMapResultToResponse,
   mapRequestToGetInventoryRecordRequest,
   mapRequestToInventoryRecordsRequest,
   mapRequestToUpdateInventoryRecordRequest,
   mapRequestToUpdateInventoryRecordsRequest,
   updateRecordAndMapResultToResponse,
   updateRecordsAndMapResultToResponse,
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

   updateRecord: async (request: Request): Promise<Response> => handleRequest(
      mapRequestToUpdateInventoryRecordRequest(request),
      validator.validateUpdateInventoryRecordRequest,
      updateRecordAndMapResultToResponse(repository.updateRecord),
   ),

   updateRecords: async (request: Request): Promise<Response> => handleRequest(
      mapRequestToUpdateInventoryRecordsRequest(request),
      validator.validateUpdateInventoryRecordsRequest,
      updateRecordsAndMapResultToResponse(repository.updateRecords),
   ),
});
