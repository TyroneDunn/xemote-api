import {Timestamps} from "../shared/timestamps.type";
import {Pagination} from "../shared/pagination.type";
import {NumberRange} from "../shared/number-range.type";
import {Order} from "../orders/order.type";

export type GetInventoryRecordDTO = {_id: string};

export type InventoryRecordsDTO = {
    filter?: InventoryRecordsFilter,
    timestamps?: Timestamps,
    sort?: InventoryRecordsSort,
    page?: Pagination
};

export type InventoryRecordsFilter = {
    productId: string,
    countRange?: NumberRange,
};

export type InventoryRecordsSort = {
    field: InventoryRecordsSortOption,
    order: Order,
};

export type InventoryRecordsSortOption =
    | "count";

export type CreateInventoryRecordDTO = {
    productId: string,
    count: number,
};

export type UpdateInventoryRecordDTO = {
    _id: string,
    updateFields: InventoryRecordUpdateFields,
};

export type InventoryRecordUpdateFields = {
    productId: string,
    count: number,
    countDelta: number
};

export type UpdateInventoryRecordsDTO = {};
export type DeleteInventoryRecordDTO = {};
