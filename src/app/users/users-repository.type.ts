import { DeleteUserRequest, GetUserRequest, UpdateUserRequest, UsersRequest } from "./users.type";
import { CommandResult, Error, User } from "@hals/common";

export type UsersRepository = {
   getUser: (request: GetUserRequest) => Promise<User | Error>,
   getUsers: (request: UsersRequest) => Promise<User[] | Error>,
   updateUser: (request: UpdateUserRequest) => Promise<User | Error>,
   deleteUser: (request: DeleteUserRequest) => Promise<CommandResult | Error>,
   deleteUsers: (request: UsersRequest) => Promise<CommandResult | Error>,
   exists: (username: string) => Promise<boolean | Error>,
};
