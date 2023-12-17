import {OrderStatus, ProductCount} from "./order.type";
import {NumberRange, OrderOption, Page, Timestamps} from "@hals/common";

export type GetOrderDTO = { _id: string };

export type OrdersDTO = {
    filter?: OrdersFilter,
    timestamps?: Timestamps,
    sort?: OrdersSort,
    page?: Page,
};

export type CreateOrderDTO = {
    clientId: string,
    cart: ProductCount,
    status: OrderStatus,
};

export type UpdateOrderDTO = {
    _id: string,
    updateFields: OrderUpdateFields,
};

export type UpdateOrdersDTO = {
    filter: OrdersFilter,
    timestamps?: Timestamps,
    updateFields: OrderUpdateFields,
};

export type OrdersFilter = {
    clientId: string,
    productId: string,
    status: string,
    countRange: NumberRange,
};

export type OrderUpdateFields = {
    newClientId: string,
    newCart: ProductCount,
    newStatus: OrderStatus,
};

export type DeleteOrderDTO = { _id: string };

export type OrdersSortOptions =
    | "clientId"
    | "status";

export type OrdersSort = {
    field: OrdersSortOptions,
    order: OrderOption,
};
