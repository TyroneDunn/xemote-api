import {
   mapRequestToPage,
   mapRequestToTimestamps,
   NumberRange,
   OK,
   OrderOption,
   Request,
   Response,
} from "@hals/common";
import {
   GetInventoryRecordRequest,
   InventoryRecord,
   InventoryRecordsRequest,
   InventoryRecordsSortOption,
   UpdateInventoryRecordRequest,
   UpdateInventoryRecordsRequest,
} from "./inventory-records.type";

export const mapRequestToGetInventoryRecordDTO = (request: Request): GetInventoryRecordRequest =>
   ({ productId: request.paramMap['id'] });

export const mapInventoryRecordToSuccessResponse = (record: InventoryRecord): Response => ({
   status: OK,
   collection: [ record ],
   count: 1,
});

export const mapRequestToInventoryRecordsDTO = (request: Request): InventoryRecordsRequest =>
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
   status: OK,
   collection: records,
   count: records.length,
});

export const mapRequestToUpdateInventoryRecordDTO = (request: Request): UpdateInventoryRecordRequest => ({
   productId: request.paramMap['id'],
   ...mapRequestToInventoryRecordUpdateFields(request.payload),
});

const mapRequestToInventoryRecordUpdateFields = (payload: any) => ({
   updateFields: {
      ...payload['newProductId'] && { newProductId: payload['newProductId'] },
      ...payload['newCount'] && { newCount: payload['newCount'] },
      ...payload['countDelta'] && { countDelta: payload['countDelta'] },
   },
});

export const mapRequestToUpdateInventoryRecordsDTO = (request: Request): UpdateInventoryRecordsRequest => ({
   ...mapRequestToInventoryRecordsFilter(request),
   ...mapRequestToTimestamps(request),
   ...mapToInventoryRecordsSort(request),
   ...mapRequestToPage(request),
   ...mapRequestToInventoryRecordUpdateFields(request.payload),
});
