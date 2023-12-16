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
import {NumberRange} from "../shared/number-range/number-range.type";
import {OrderOption} from "../shared/order-option/order-option.type";
import {mapRequestToPage} from "../shared/page/page.utility";
import {mapRequestToTimestamps} from "../shared/timestamps/timestamps.utility";

export const mapRequestToGetInventoryRecordDTO = (request: Request): GetInventoryRecordDTO =>
    ({_id: request.paramMap['id']});

export const mapInventoryRecordToSuccessResponse = (record: InventoryRecord): Response => ({
    status: HttpStatusCodes.OK,
    collection: [record],
    count: 1
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
            order: request.queryParamMap['order'] as OrderOption,
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
    ...mapRequestToInventoryRecordUpdateFields(request.payload)
});

const mapRequestToInventoryRecordUpdateFields = (payload: Object) => ({
    updateFields: {
        ...payload['newProductId'] && {newProductId: payload['newProductId']},
        ...payload['newCount'] && {newCount: payload['newCount']},
        ...payload['countDelta'] && {countDelta: payload['countDelta']},
    }
});

export const mapRequestToUpdateInventoryRecordsDTO = (request: Request): UpdateInventoryRecordsDTO => ({
    ...mapRequestToInventoryRecordsFilter(request),
    ...mapRequestToTimestamps(request),
    ...mapToInventoryRecordsSort(request),
    ...mapRequestToPage(request),
    ...mapRequestToInventoryRecordUpdateFields(request),
});

export const mapRequestToDeleteInventoryRecordDTO = (request: Request): DeleteInventoryRecordDTO =>
    ({_id: request.paramMap['id']});
