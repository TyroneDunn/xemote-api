import { DeleteUserRequest, GetUserRequest, UpdateUserRequest, UsersRequest } from "./users.type";
import { CommandResult, Error, User } from "@hals/common";

export type UsersRepository = {
   getUser: GetUser,
   getUsers: GetUsers,
   updateUser: UpdateUser,
   deleteUser: DeleteUser,
   deleteUsers: DeleteUsers,
   exists: (username: string) => Promise<boolean | Error>,
};

export type GetUser = (request : GetUserRequest) => Promise<User | Error>;
export type GetUsers = (request : UsersRequest) => Promise<User[] | Error>;
export type UpdateUser = (request : UpdateUserRequest) => Promise<User | Error>;
export type DeleteUser = (request : DeleteUserRequest) => Promise<CommandResult | Error>;
export type DeleteUsers = (request : UsersRequest) => Promise<CommandResult | Error>;
