import { UsersRepository } from "./users-repository.type";
import {
   DeleteUserDTO,
   GetUserDTO,
   UpdateUserDTO,
   UpdateUsersDTO,
   UsersDTO,
} from "./users-dtos.type";
import { User } from "./user.type";
import { Promise } from "mongoose";
import { CommandResult } from "@hals/common";

export const MongoUsersRepository: UsersRepository = {
   getUser(dto: GetUserDTO): Promise<User> {
      return Promise.resolve(undefined);
   },

   getUsers(dto: UsersDTO): Promise<User[]> {
      return Promise.resolve([]);
   },

   updateUser(dto: UpdateUserDTO): Promise<User> {
      return Promise.resolve(undefined);
   },

   updateUsers(dto: UpdateUsersDTO): Promise<CommandResult> {
      return Promise.resolve([]);
   },

   deleteUser(dto: DeleteUserDTO): Promise<CommandResult> {
      return Promise.resolve(undefined);
   },

   deleteUsers(dto: UsersDTO): Promise<CommandResult> {
      return Promise.resolve("");
   },

   exists(username: string): Promise<boolean> {
      return Promise.resolve(false);
   },
};