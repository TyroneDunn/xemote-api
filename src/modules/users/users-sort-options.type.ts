import {OrderOption} from "../../shared/sort/order-option.type";

export type UserSortOptions = {
    sortOption: 'username' | 'id' | 'dateCreated' | 'lastUpdated',
    order: OrderOption,
};