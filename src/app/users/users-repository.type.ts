import { User } from "./user.type";
import {
   DeleteUserDTO,
   DeleteUsersDTO,
   GetUserDTO,
   GetUsersDTO,
   UpdateUserDTO,
   UpdateUsersDTO,
} from "./users-dtos.type";

export type UsersRepository = {
   getUser: (dto: GetUserDTO) => Promise<User>,
   getUsers: (dto: GetUsersDTO) => Promise<User[]>,
   deleteUser: (dto: DeleteUserDTO) => Promise<User>,
   deleteUsers: (dto: DeleteUsersDTO) => Promise<string>,
   updateUser: (dto: UpdateUserDTO) => Promise<User>,
   updateUsers: (dto: UpdateUsersDTO) => Promise<User[]>,
   exists: (username: string) => Promise<boolean>,
};
