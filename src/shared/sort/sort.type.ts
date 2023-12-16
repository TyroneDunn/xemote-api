import {OrderOptions} from "../order-options/order-options.type";

export type Sort<T> = {
    field: T,
    order: OrderOptions
};
