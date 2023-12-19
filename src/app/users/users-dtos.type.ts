import {UserSortOptions} from "./users-sort-options.type";
import {UserPermissions} from "./user-permissions.type";
import {Page} from "../../shared/page/page.type";
import {UsersFilter} from "./users-filter.type";
import {Timestamps} from "../../shared/timestamps/timestamps.type";

export type GetUserDTO = { username: string };

export type GetUsersDTO = {
    filter?: UsersFilter,
    timestamps?: Timestamps,
    sort?: UserSortOptions,
    page?: Page,
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
