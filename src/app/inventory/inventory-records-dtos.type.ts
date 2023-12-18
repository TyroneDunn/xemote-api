import {NumberRange, OrderOption, Page, Timestamps} from "@hals/common";

export type GetInventoryRecordDTO = { productId: string };

export type InventoryRecordsDTO = {
    filter?: InventoryRecordsFilter,
    timestamps?: Timestamps,
    sort?: InventoryRecordsSort,
    page?: Page
};

export type InventoryRecordsFilter = {
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
    productId: string,
    updateFields: InventoryRecordUpdateFields,
};

export type InventoryRecordUpdateFields = {
    newCount: number,
    countDelta: number
};

export type UpdateInventoryRecordsDTO = {
    filter: InventoryRecordsFilter,
    timestamps?: Timestamps,
    updateFields: InventoryRecordUpdateFields,
};

export type DeleteInventoryRecordDTO = { productId: string };
