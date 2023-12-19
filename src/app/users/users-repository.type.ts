import { User } from "./user.type";
import {
   DeleteUserDTO,
   GetUserDTO,
   UpdateUserDTO,
   UpdateUsersDTO,
   UsersDTO,
} from "./users-dtos.type";

export type UsersRepository = {
   getUser: (dto: GetUserDTO) => Promise<User>,
   getUsers: (dto: UsersDTO) => Promise<User[]>,
   deleteUser: (dto: DeleteUserDTO) => Promise<User>,
   deleteUsers: (dto: UsersDTO) => Promise<string>,
   updateUser: (dto: UpdateUserDTO) => Promise<User>,
   updateUsers: (dto: UpdateUsersDTO) => Promise<User[]>,
   exists: (username: string) => Promise<boolean>,
};
