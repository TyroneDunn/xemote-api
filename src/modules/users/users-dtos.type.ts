import {UserSortOptions} from "./users-sort-options.type";
import {UserPermissions} from "./user-permissions.type";
import {Pagination} from "../../shared/pagination.type";
import {UsersFilter} from "./users-filter.type";
import {Timestamps} from "../../shared/timestamps.type";

export type GetUserDTO = { username: string };

export type GetUsersDTO = {
    filter?: UsersFilter,
    timestamps?: Timestamps,
    sort?: UserSortOptions,
    page?: Pagination,
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
    timestamps?: Timestamps,
    newPermissions: UserPermissions[],
    sort?: UserSortOptions,
};

export type DeleteUserDTO = { username: string };

export type DeleteUsersDTO = {
    filter?: UsersFilter,
    timestamps?: Timestamps,
    sort?: UserSortOptions,
};
