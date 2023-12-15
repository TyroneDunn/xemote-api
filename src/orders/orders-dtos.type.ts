import {Timestamps} from "../shared/timestamps.type";
import {Pagination} from "../shared/pagination.type";
import {NumberRange} from "../shared/number-range.type";
import {Sort} from "../shared/sort.type";
import {OrderStatus, ProductCount} from "./order.type";

export type GetOrderDTO = { _id: string };

export type OrdersDTO = {
    filter?: OrdersFilter,
    timestamps?: Timestamps,
    sort?: OrdersSort,
    page?: Pagination,
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
    product: string,
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

export type OrdersSort = Sort<OrdersSortOptions>;
