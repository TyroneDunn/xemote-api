import {UserSortOptions} from "./users-sort-options.type";
import {UserPermissions} from "./user-permissions.type";
import {PaginationOptions} from "../../shared/pagination-options.type";
import {UsersFilter} from "./users-filter.type";
import {DateRangeFilter} from "../../shared/date-range-filter.type";

export type GetUserDTO = { username: string };

export type GetUsersDTO = {
    filter?: UsersFilter,
    dateRange?: DateRangeFilter,
    sort?: UserSortOptions,
    page?: PaginationOptions,
};

export type RegisterUserDTO = {
    username: string,
    password: string,
};

export type UpdateUserDTO = {
    username: string,
    newUsername?: string,
    newPassword?: string,
    newPermissions?: string[]
};

export type UpdateUsersDTO = {
    filter: UsersFilter,
    dateRange?: DateRangeFilter,
    newPermissions: UserPermissions[],
    sort?: UserSortOptions,
};

export type DeleteUserDTO = { username: string };

export type DeleteUsersDTO = {
    filter?: UsersFilter,
    dateRange?: DateRangeFilter,
    sort?: UserSortOptions,
};
