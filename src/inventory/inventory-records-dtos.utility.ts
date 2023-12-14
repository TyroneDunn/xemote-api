import {HttpStatusCodes, Request, Response} from "@hals/core";
import {
    CreateInventoryRecordDTO,
    DeleteInventoryRecordDTO,
    GetInventoryRecordDTO,
    InventoryRecordsDTO,
    InventoryRecordsSortOption,
    UpdateInventoryRecordDTO,
    UpdateInventoryRecordsDTO
} from "./inventory-records-dtos.type";
import {InventoryRecord} from "./inventory-record.type";
import {mapRequestToPage, mapRequestToTimestamps} from "../shared/hals.utility";
import {NumberRange} from "../shared/number-range.type";
import {OrderOptions} from "../shared/order-options.type";

export const mapRequestToGetInventoryRecordDTO = (request: Request): GetInventoryRecordDTO =>
    ({_id: request.paramMap['id']});

export const mapInventoryRecordToSuccessResponse = (record: InventoryRecord): Response => ({
    status: HttpStatusCodes.OK,
    collection: [record],
    count: 1
});

export const mapRequestToInventoryRecordsDTO = (request: Request): InventoryRecordsDTO =>
    ({
        ...mapToInventoryRecordsFilter(request),
        ...mapRequestToTimestamps(request),
        ...mapToInventoryRecordsSort(request),
        ...mapRequestToPage(request),
    });

const mapToInventoryRecordsFilter = (request: Request) => ({
    filter: {
        ...request.queryParamMap['productId']
        && {productId: request.queryParamMap['productId']},
        ...request.queryParamMap['countRange']
        && {countRange: JSON.parse(request.queryParamMap['countRange']) as NumberRange},
    }
});

const mapToInventoryRecordsSort = (request: Request) => ({
    ...(request.queryParamMap['sort'] && request.queryParamMap['order']) && {
        sort: {
            field: request.queryParamMap['sort'] as InventoryRecordsSortOption,
            order: request.queryParamMap['order'] as OrderOptions,
        }
    }
});

export const mapInventoryRecordsToSuccessResponse = (records: InventoryRecord[]): Response => ({
    status: HttpStatusCodes.OK,
    collection: records,
    count: records.length
});

export const mapRequestToCreateInventoryRecordDTO = (request: Request): CreateInventoryRecordDTO => ({
    productId: request.payload['productId'],
    count: parseInt(request.payload['count'])
});

export const mapRequestToUpdateInventoryRecordDTO = (request: Request): UpdateInventoryRecordDTO => ({
    _id: request.paramMap['id'],
    ...mapToUpdateFields(request.payload)
});

const mapToUpdateFields = (payload: Object) => ({
    updateFields: {
        ...payload['newProductId'] && {newProductId: payload['newProductId']},
        ...payload['newCount'] && {newCount: payload['newCount']},
        ...payload['countDelta'] && {countDelta: payload['countDelta']},
    }
});

export const mapRequestToUpdateInventoryRecordsDTO = (request: Request): UpdateInventoryRecordsDTO => ({
    ...mapToInventoryRecordsFilter(request),
    ...mapRequestToTimestamps(request),
    ...mapToInventoryRecordsSort(request),
    ...mapRequestToPage(request),
    ...mapToUpdateFields(request),
});

export const mapRequestToDeleteInventoryRecordDTO = (request: Request): DeleteInventoryRecordDTO =>
    ({_id: request.paramMap['id']});
