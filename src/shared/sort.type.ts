import {OrderOptions} from "./order-options.type";

export type Sort<T> = {
    field: T,
    order: OrderOptions
};
