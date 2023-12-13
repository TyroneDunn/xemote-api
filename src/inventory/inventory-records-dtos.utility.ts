import {HttpStatusCodes, Request, Response} from "@hals/core";
import {CreateInventoryRecordDTO, GetInventoryRecordDTO,} from "./inventory-records-dtos.type";
import {InventoryRecord} from "./inventory-record.type";

export const mapRequestToGetInventoryRecordDTO = (request: Request): GetInventoryRecordDTO =>
    ({_id: request.paramMap['id']});

export const mapInventoryRecordToSuccessResponse = (record: InventoryRecord): Response => ({
    status: HttpStatusCodes.OK,
    collection: [record],
    count: 1
});

export const mapInventoryRecordsToSuccessResponse = (records: InventoryRecord[]): Response => ({
    status: HttpStatusCodes.OK,
    collection: records,
    count: records.length
});

export const mapRequestToCreateInventoryRecordDTO = (request: Request): CreateInventoryRecordDTO => {
    return {
        productId: request.payload['productId'],
        count: parseInt(request.payload['count'])
    };
};
