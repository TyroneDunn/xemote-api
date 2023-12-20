import { UsersRepository } from "./users-repository.type";
import {
   DeleteUserDTO,
   GetUserDTO,
   UpdateUserDTO,
   UsersDTO,
   UserUpdateFields,
} from "./users-dtos.type";
import { CommandResult, configureHashUtility, Error, User } from "@hals/common";
import UsersModel from "./mongo-user.model";
import {
   HASHING_ALGORITHM,
   HASHING_ITERATIONS,
   PASSWORD_LENGTH,
   PASSWORD_SALT,
} from "../../environments";
import { DeleteResult } from "mongodb";

export const MongoUsersRepository: UsersRepository = {
   getUser: async (dto: GetUserDTO): Promise<User | Error> => {
      try {
         const user: User | null = await UsersModel.findOne({ username: dto.username });
         if (!user) return { type: "NotFound", message: 'User not found.' };
         return user as User;
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   getUsers: async (dto: UsersDTO): Promise<User[] | Error> => {
      try {
         const filter = mapUsersDtoToUsersFilter(dto);
         const query = UsersModel.find(filter);
         if (dto.sort)
            query.sort({ [dto.sort.field]: dto.sort.order === 'asc' ? 1 : -1 });
         if (dto.page) {
            query.skip(dto.page.index * dto.page.limit);
            query.limit(dto.page.limit);
         }
         return query.exec();
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   updateUser: async (dto: UpdateUserDTO): Promise<User | Error> => {
      try {
         const user: User | null = await UsersModel.findOneAndUpdate(
            { username: dto.username },
            mapUserUpdateFieldsToUpdateQuery(dto.updateFields),
            { new: true },
         );
         if (!user) return { type: "NotFound", message: 'User not found.' };
         return user as User;
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   deleteUser: async (dto: DeleteUserDTO): Promise<CommandResult | Error> => {
      try {
         const result: DeleteResult = await UsersModel.deleteOne({ username: dto.username });
         return { success: result.acknowledged, affectedCount: result.deletedCount };
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   deleteUsers: async (dto: UsersDTO): Promise<CommandResult | Error> => {
      try {
         const filter = mapUsersDtoToUsersFilter(dto);
         const result: DeleteResult = await UsersModel.deleteMany(filter);
         return { success: result.acknowledged, affectedCount: result.deletedCount };
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   exists: async (username: string): Promise<boolean | Error> => {
      try {
         const user: User | null = await UsersModel.findOne({ username: username });
         return !!user;
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },
};

const mapUsersDtoToUsersFilter = (dto: UsersDTO) => ({
   ...dto.filter && {
      ...dto.filter.username && { username: dto.filter.username },
      ...dto.filter.usernameRegex && {
         username: {
            $regex: dto.filter.usernameRegex,
            $options: 'i',
         },
      },
   },
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

const hashUtility = configureHashUtility(
   PASSWORD_SALT,
   HASHING_ITERATIONS,
   PASSWORD_LENGTH,
   HASHING_ALGORITHM,
);

const mapUserUpdateFieldsToUpdateQuery = (updateFields: UserUpdateFields) => ({
   ...updateFields.newUsername && { username: updateFields.newUsername },
   ...updateFields.newPassword && { hash: hashUtility.generateHash(updateFields.newPassword) },
});
