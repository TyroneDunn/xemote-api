import { UsersRepository } from "./users-repository.type";
import {
   DeleteUserDTO,
   GetUserDTO,
   UpdateUserDTO,
   UsersDTO,
   UserUpdateFields,
} from "./users-dtos.type";
import { User } from "./user.type";
import { Promise } from "mongoose";
import { CommandResult, configureHashUtility } from "@hals/common";
import UsersModel from "./mongo-user.model";
import {
   HASHING_ALGORITHM,
   HASHING_ITERATIONS,
   PASSWORD_LENGTH,
   PASSWORD_SALT,
} from "../../environments";
import { DeleteResult } from "mongodb";

const hashUtility = configureHashUtility(
   PASSWORD_SALT,
   HASHING_ITERATIONS,
   PASSWORD_LENGTH,
   HASHING_ALGORITHM,
);

export const MongoUsersRepository: UsersRepository = {
   getUser: (dto: GetUserDTO): Promise<User> =>
      UsersModel.findOne({ username: dto.username }),

   getUsers(dto: UsersDTO): Promise<User[]> {
      const filter = mapUsersDtoToUsersFilter(dto);
      const query = UsersModel.find(filter);
      if (dto.sort)
         query.sort({ [dto.sort.field]: dto.sort.order === 'asc' ? 1 : -1 });
      if (dto.page) {
         query.skip(dto.page.index * dto.page.limit);
         query.limit(dto.page.limit);
      }
      return query.exec();
   },

   updateUser: (dto: UpdateUserDTO): Promise<User> =>
      UsersModel.findOneAndUpdate(
         { username: dto.username },
         mapUserUpdateFieldsToUpdateQuery(dto.updateFields),
         { new: true },
      ),

   deleteUser(dto: DeleteUserDTO): Promise<CommandResult> {
      const result: DeleteResult = await UsersModel.deleteOne({ username: dto.username });
      return { success: result.acknowledged, affectedCount: result.deletedCount };
   },

   deleteUsers(dto: UsersDTO): Promise<CommandResult> {
      const filter = mapUsersDtoToUsersFilter(dto);
      const result: DeleteResult = await UsersModel.deleteMany(filter);
      return { success: result.acknowledged, affectedCount: result.deletedCount };
   },

   exists(username: string): Promise<boolean> {
      return Promise.resolve(false);
   },
};

const mapUsersDtoToUsersFilter = (dto: UsersDTO) => ({
   ...dto.filter.username && { username: dto.filter.username },
   ...dto.filter.usernameRegex && { username: { $regex: dto.filter.usernameRegex, $options: 'i' } },
   ...dto.timestamps && {
      ...dto.timestamps.createdAt && {
         ...(dto.timestamps.createdAt.start && !dto.timestamps.createdAt.end) &&
         { createdAt: { $gte: dto.timestamps.createdAt.start } },
         ...(!dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) &&
         { createdAt: { $lte: dto.timestamps.createdAt.end } },
         ...(dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) && {
            createdAt: {
               $gte: dto.timestamps.createdAt.start,
               $lte: dto.timestamps.createdAt.end,
            },
         },
      },
      ...dto.timestamps.updatedAt && {
         ...(dto.timestamps.updatedAt.start && !dto.timestamps.updatedAt.end) &&
         { updatedAt: { $gte: dto.timestamps.updatedAt.start } },
         ...(!dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) &&
         { updatedAt: { $lte: dto.timestamps.updatedAt.end } },
         ...(dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) && {
            updatedAt: {
               $gte: dto.timestamps.updatedAt.start,
               $lte: dto.timestamps.updatedAt.end,
            },
         },
      },
   },
});

const mapUserUpdateFieldsToUpdateQuery = (updateFields: UserUpdateFields) => ({
   ...updateFields.newUsername && { username: updateFields.newUsername },
   ...updateFields.newPassword && { hash: hashUtility.generateHash(updateFields.newPassword) },
});
