import {Timestamps} from "../shared/timestamps.type";
import {Pagination} from "../shared/pagination.type";
import {NumberRange} from "../shared/number-range.type";
import {Order} from "../orders/order.type";


export type InventoryRecordsDTO = {
    filter?: InventoryRecordsFilter,
    timestamps?: Timestamps,
    sort?: InventoryRecordsSort,
    page?: Pagination
};

export type InventoryRecordsFilter = {
    countRange?: NumberRange,
};

export type InventoryRecordsSort = {
    field: InventoryRecordsSortOption,
    order: Order,
};

export type InventoryRecordsSortOption =
    | "count";

export type CreateInventoryRecordDTO = {};
export type UpdateInventoryRecordDTO = {};
export type UpdateInventoryRecordsDTO = {};
export type DeleteInventoryRecordDTO = {};
