import {OrderOption} from "../../shared/order-option/order-option.type";

export type UserSortOptions = {
    sortOption: 'username' | 'id' | 'dateCreated' | 'lastUpdated',
    order: OrderOption,
};