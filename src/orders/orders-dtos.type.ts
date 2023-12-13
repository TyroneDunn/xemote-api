import {Timestamps} from "../shared/timestamps.type";
import {Pagination} from "../shared/pagination.type";
import {NumberRange} from "../shared/number-range.type";
import {Sort} from "../shared/sort.type";

export type GetOrderDTO = { _id: string };

export type OrdersDTO = {
    filter?: OrdersFilter,
    timestamps?: Timestamps,
    sort?: OrdersSort,
    page?: Pagination,
};

export type CreateOrderDTO = {};

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
    name?: string,
    nameRegex?: string,
    typeRegex?: string,
    costPriceRange?: NumberRange,
    markupRange?: NumberRange,
};

export type OrderUpdateFields = {}

export type DeleteOrderDTO = { _id: string };

export type OrdersSortOptions =
    | "clientId"
    | "status";

export type OrdersSort = Sort<OrdersSortOptions>;