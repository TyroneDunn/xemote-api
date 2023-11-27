import {User} from "./user.type";
import {
    DeleteUserDTO,
    DeleteUsersDTO,
    GetUserDTO,
    GetUsersDTO,
    RegisterUserDTO,
    UpdateUserDTO,
    UpdateUsersDTO
} from "./users-dtos.type";
import {UserPermissions} from "./user-permissions.type";

export type UsersRepository = {
    getUser: (dto: GetUserDTO) => Promise<User>,
    getUsers: (dto: GetUsersDTO) => Promise<User[]>,
    registerUser: (dto: RegisterUserDTO) => Promise<User>,
    deleteUser: (dto: DeleteUserDTO) => Promise<User>,
    deleteUsers: (dto: DeleteUsersDTO) => Promise<string>,
    updateUser: (dto: UpdateUserDTO) => Promise<User>,
    updateUsers: (dto: UpdateUsersDTO) => Promise<User[]>,
    exists: (username: string) => Promise<boolean>,
    hasPermissions: (
        username: string,
        permissions: UserPermissions[]
    ) => Promise<boolean>,
};