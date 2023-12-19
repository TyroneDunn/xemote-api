import { OrderOption, Page, Timestamps } from "@hals/common";

export type GetUserDTO = { username: string };

export type UsersDTO = {
   filter?: UsersFilter,
   timestamps?: Timestamps,
   sort?: UsersSort,
   page?: Page,
};

export type UsersFilter = {
   username?: string,
   usernameRegex?: string,
};

export type UsersSort = {
   field: 'username' | 'createdAt' | 'updatedAt',
   order: OrderOption,
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
   sort?: UsersSort,
};

export type DeleteUserDTO = { username: string };
