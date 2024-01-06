import { OrderOption, Page, Timestamps } from "@hals/common";

export type GetUserRequest = { username: string };

export type UsersRequest = {
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
   field: UsersSortOption,
   order: OrderOption,
};

export type UsersSortOption = 'username' | 'createdAt' | 'updatedAt';

export type UpdateUserRequest = {
   username: string,
   updateFields: UserUpdateFields
};

export type UserUpdateFields = {
   newUsername?: string,
   newPassword?: string,
};

export type DeleteUserRequest = { username: string };
