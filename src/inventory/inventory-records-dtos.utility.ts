import {Request} from "@hals/core";
import {GetInventoryRecordDTO,} from "./inventory-records-dtos.type";

export const mapRequestToGetInventoryRecordDTO = (request: Request): GetInventoryRecordDTO =>
    ({_id: request.paramMap['id']});

