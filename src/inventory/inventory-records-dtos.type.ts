import {Timestamps} from "../shared/timestamps/timestamps.type";
import {Pagination} from "../shared/pagination/pagination.type";
import {NumberRange} from "../shared/number-range/number-range.type";
import {OrderOption} from "../shared/order-option/order-option.type";

export type GetInventoryRecordDTO = { _id: string };

export type InventoryRecordsDTO = {
    filter?: InventoryRecordsFilter,
    timestamps?: Timestamps,
    sort?: InventoryRecordsSort,
    page?: Pagination
};

export type InventoryRecordsFilter = {
    productId?: string,
    countRange?: NumberRange,
};

export type InventoryRecordsSort = {
    field: InventoryRecordsSortOption,
    order: OrderOption,
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
    newProductId: string,
    newCount: number,
    countDelta: number
};

export type UpdateInventoryRecordsDTO = {
    filter: InventoryRecordsFilter,
    timestamps?: Timestamps,
    updateFields: InventoryRecordUpdateFields,
};

export type DeleteInventoryRecordDTO = { _id: string };
