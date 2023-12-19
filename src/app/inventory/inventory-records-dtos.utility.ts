import { HttpStatusCodes, Request, Response } from "@hals/core";
import {
   GetInventoryRecordDTO,
   InventoryRecordsDTO,
   InventoryRecordsSortOption,
   UpdateInventoryRecordDTO,
   UpdateInventoryRecordsDTO,
} from "./inventory-records-dtos.type";
import { InventoryRecord } from "./inventory-record.type";
import { mapRequestToPage, mapRequestToTimestamps, NumberRange, OrderOption } from "@hals/common";

export const mapRequestToGetInventoryRecordDTO = (request: Request): GetInventoryRecordDTO =>
   ({ productId: request.paramMap['id'] });

export const mapInventoryRecordToSuccessResponse = (record: InventoryRecord): Response => ({
   status: HttpStatusCodes.OK,
   collection: [ record ],
   count: 1,
});

export const mapRequestToInventoryRecordsDTO = (request: Request): InventoryRecordsDTO =>
   ({
      ...mapRequestToInventoryRecordsFilter(request),
      ...mapRequestToTimestamps(request),
      ...mapToInventoryRecordsSort(request),
      ...mapRequestToPage(request),
   });

const mapRequestToInventoryRecordsFilter = (request: Request) => ({
   filter: {
      ...request.queryParamMap['countRange']
      && { countRange: JSON.parse(request.queryParamMap['countRange']) as NumberRange },
   },
});

const mapToInventoryRecordsSort = (request: Request) => ({
   ...(request.queryParamMap['sort'] && request.queryParamMap['order']) && {
      sort: {
         field: request.queryParamMap['sort'] as InventoryRecordsSortOption,
         order: request.queryParamMap['order'] as OrderOption,
      },
   },
});

export const mapInventoryRecordsToSuccessResponse = (records: InventoryRecord[]): Response => ({
   status: HttpStatusCodes.OK,
   collection: records,
   count: records.length,
});

export const mapRequestToUpdateInventoryRecordDTO = (request: Request): UpdateInventoryRecordDTO => ({
   productId: request.paramMap['id'],
   ...mapRequestToInventoryRecordUpdateFields(request.payload),
});

const mapRequestToInventoryRecordUpdateFields = (payload: Object) => ({
   updateFields: {
      ...payload['newProductId'] && { newProductId: payload['newProductId'] },
      ...payload['newCount'] && { newCount: payload['newCount'] },
      ...payload['countDelta'] && { countDelta: payload['countDelta'] },
   },
});

export const mapRequestToUpdateInventoryRecordsDTO = (request: Request): UpdateInventoryRecordsDTO => ({
   ...mapRequestToInventoryRecordsFilter(request),
   ...mapRequestToTimestamps(request),
   ...mapToInventoryRecordsSort(request),
   ...mapRequestToPage(request),
   ...mapRequestToInventoryRecordUpdateFields(request.payload),
});
