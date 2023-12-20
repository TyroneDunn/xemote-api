import { DeleteUserDTO, GetUserDTO, UpdateUserDTO, UsersDTO } from "./users-dtos.type";
import { CommandResult, Error, User } from "@hals/common";

export type UsersRepository = {
   getUser: (dto: GetUserDTO) => Promise<User | Error>,
   getUsers: (dto: UsersDTO) => Promise<User[] | Error>,
   updateUser: (dto: UpdateUserDTO) => Promise<User | Error>,
   deleteUser: (dto: DeleteUserDTO) => Promise<CommandResult | Error>,
   deleteUsers: (dto: UsersDTO) => Promise<CommandResult | Error>,
   exists: (username: string) => Promise<boolean | Error>,
};
