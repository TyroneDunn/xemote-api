import { NumberRange, OrderOption, Page, Timestamps } from "@hals/common";

export type Order = {
   _id : string
   clientId : string,
   cart : ProductCount,
   status : OrderStatus,
};

export type ProductCount = Record<string, number>;

export type OrderStatus =
   | "complete"
   | "pending"
   | "cancelled";

export type GetOrderRequest = { _id : string };

export type OrdersRequest = {
   filter? : OrdersFilter,
   timestamps? : Timestamps,
   sort? : OrdersSort,
   page? : Page,
};


export type CreateOrderRequest = {
   clientId : string,
   cart : ProductCount,
   status : OrderStatus,
};

export type UpdateOrderRequest = {
   _id : string,
   updateFields : OrderUpdateFields,
};

export type UpdateOrdersRequest = {
   filter : OrdersFilter,
   timestamps? : Timestamps,
   updateFields : OrderUpdateFields,
};

export type OrdersFilter = {
   clientId? : string,
   productId? : string,
   status? : OrderStatus,
   countRange? : NumberRange,
};

export type OrderUpdateFields = {
   newCart : ProductCount,
   newStatus : OrderStatus,
};

export type DeleteOrderRequest = { _id : string };

export type OrdersSortOptions =
   | "clientId"
   | "status";

export type OrdersSort = {
   field : OrdersSortOptions,
   order : OrderOption,
};
