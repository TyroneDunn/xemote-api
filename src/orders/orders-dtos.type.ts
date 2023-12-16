import {Timestamps} from "../shared/timestamps/timestamps.type";
import {Page} from "../shared/page/page.type";
import {NumberRange} from "../shared/number-range/number-range.type";
import {Sort} from "../shared/sort/sort.type";
import {OrderStatus, ProductCount} from "./order.type";

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

export type OrdersSort = Sort<OrdersSortOptions>;
