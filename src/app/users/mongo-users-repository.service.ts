import { UsersRepository } from "./users-repository.type";
import {
   DeleteUserRequest,
   GetUserRequest,
   UpdateUserRequest,
   UsersRequest,
   UserUpdateFields,
} from "./users.type";
import { CommandResult, Error, HashUtility, User } from "@hals/common";
import UsersModel from "./mongo-user-model.type";
import {
   HASHING_ALGORITHM,
   HASHING_ITERATIONS,
   PASSWORD_LENGTH,
   PASSWORD_SALT,
} from "../../environments";
import { DeleteResult } from "mongodb";

export const MongoUsersRepository: UsersRepository = {
   getUser: async (dto: GetUserRequest): Promise<User | Error> => {
      try {
         const user: User | null = await UsersModel.findOne({ username: dto.username });
         if (!user) return Error("NotFound", 'User not found.');
         return user as User;
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },

   getUsers: async (dto: UsersRequest): Promise<User[] | Error> => {
      try {
         const filter = mapUsersRequestToUsersFilter(dto);
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
         return Error("Internal", (error as Error).message);
      }
   },

   updateUser: async (dto: UpdateUserRequest): Promise<User | Error> => {
      try {
         const user: User | null = await UsersModel.findOneAndUpdate(
            { username: dto.username },
            mapUserUpdateFieldsToUpdateQuery(dto.updateFields, hashUtility),
            { new: true },
         );
         if (!user) return Error("NotFound", 'User not found.');
         return user as User;
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },

   deleteUser: async (dto: DeleteUserRequest): Promise<CommandResult | Error> => {
      try {
         const result: DeleteResult = await UsersModel.deleteOne({ username: dto.username });
         return CommandResult(result.acknowledged, result.deletedCount);
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },

   deleteUsers: async (dto: UsersRequest): Promise<CommandResult | Error> => {
      try {
         const filter = mapUsersRequestToUsersFilter(dto);
         const result: DeleteResult = await UsersModel.deleteMany(filter);
         return CommandResult(result.acknowledged, result.deletedCount);
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },

   exists: async (username: string): Promise<boolean | Error> => {
      try {
         const user: User | null = await UsersModel.findOne({ username: username });
         return !!user;
      }
      catch (error) {
         return Error("Internal", (error as Error).message);
      }
   },
};

const mapUsersRequestToUsersFilter = (dto: UsersRequest) => ({
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

const hashUtility: HashUtility = HashUtility(
   PASSWORD_SALT,
   HASHING_ITERATIONS,
   PASSWORD_LENGTH,
   HASHING_ALGORITHM,
);

const mapUserUpdateFieldsToUpdateQuery = (
   updateFields: UserUpdateFields,
   hashUtility: HashUtility
) => ({
   ...updateFields.newUsername && { username: updateFields.newUsername },
   ...updateFields.newPassword && { hash: hashUtility.generateHash(updateFields.newPassword) },
});
