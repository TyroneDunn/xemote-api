import {OrderOption} from "./order-option.type";

export type Sort<T> = {
    field: T,
    order: OrderOption
};
