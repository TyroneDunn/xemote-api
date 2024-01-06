import { NumberRange, OrderOption, Page, Timestamps } from "@hals/common";

export type InventoryRecord = {
   productId : string,
   count : number
};

export type GetInventoryRecordRequest = { productId : string };

export type InventoryRecordsRequest = {
   filter? : InventoryRecordsFilter,
   timestamps? : Timestamps,
   sort? : InventoryRecordsSort,
   page? : Page
};

export type InventoryRecordsFilter = {
   countRange? : NumberRange,
};

export type InventoryRecordsSort = {
   field : InventoryRecordsSortOption,
   order : OrderOption,
};

export type InventoryRecordsSortOption =
   | "count";

export type CreateInventoryRecordRequest = {
   productId : string,
   count : number,
};

export type UpdateInventoryRecordRequest = {
   productId : string,
   updateFields : InventoryRecordUpdateFields,
};

export type InventoryRecordUpdateFields = {
   newCount : number,
   countDelta : number
};

export type UpdateInventoryRecordsRequest = {
   filter : InventoryRecordsFilter,
   timestamps? : Timestamps,
   updateFields : InventoryRecordUpdateFields,
};

export type DeleteInventoryRecordRequest = { productId : string };
