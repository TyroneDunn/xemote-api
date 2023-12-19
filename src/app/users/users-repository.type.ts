import { User } from "./user.type";
import { DeleteUserDTO, GetUserDTO, UpdateUserDTO, UsersDTO } from "./users-dtos.type";
import { CommandResult } from "@hals/common";

export type UsersRepository = {
   getUser: (dto: GetUserDTO) => Promise<User>,
   getUsers: (dto: UsersDTO) => Promise<User[]>,
   updateUser: (dto: UpdateUserDTO) => Promise<User>,
   deleteUser: (dto: DeleteUserDTO) => Promise<CommandResult>,
   deleteUsers: (dto: UsersDTO) => Promise<CommandResult>,
   exists: (username: string) => Promise<boolean>,
};
