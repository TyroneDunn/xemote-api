import {OrderOptions} from "../../shared/order-options.type";

export type UserSortOptions = {
    sortOption: 'username' | 'id' | 'dateCreated' | 'lastUpdated',
    order: OrderOptions,
};