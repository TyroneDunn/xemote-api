import { DeleteUserRequest, GetUserRequest, UpdateUserRequest, UsersRequest } from "./users.type";
import { CommandResult, Error, User } from "@hals/common";

export type UsersRepository = {
   getUser: (dto: GetUserRequest) => Promise<User | Error>,
   getUsers: (dto: UsersRequest) => Promise<User[] | Error>,
   updateUser: (dto: UpdateUserRequest) => Promise<User | Error>,
   deleteUser: (dto: DeleteUserRequest) => Promise<CommandResult | Error>,
   deleteUsers: (dto: UsersRequest) => Promise<CommandResult | Error>,
   exists: (username: string) => Promise<boolean | Error>,
};
