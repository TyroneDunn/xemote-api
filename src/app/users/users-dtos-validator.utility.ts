import { ValidationError } from "@hals/common";
import { DeleteUserDTO, GetUserDTO, UpdateUserDTO, UsersDTO } from "./users-dtos.type";
import { UsersRepository } from "./users-repository.type";

export type UsersDtosValidator = {
   validateGetUserDto: (dto: GetUserDTO) => Promise<ValidationError | null>,
   validateUsersDto: (dto: UsersDTO) => Promise<ValidationError | null>,
   validateUpdateUserDto: (dto: UpdateUserDTO) => Promise<ValidationError | null>,
   validateDeleteUserDto: (dto: DeleteUserDTO) => Promise<ValidationError | null>,
};

export const configureUsersDtosValidator = (repository: UsersRepository): UsersDtosValidator => ({
   validateGetUserDto: async (dto: GetUserDTO): Promise<ValidationError | null> => {
      if (!dto.username)
         return { error: { type: "BadRequest", message: 'Username required.' } };
      if (!(await repository.exists(dto.username)))
         return { error: { type: "NotFound", message: `User "${dto.username}" not found.` } };
      return null;
   },

   validateUsersDto: async (dto: UsersDTO): Promise<ValidationError | null> => {
      if (dto.filter)
         if (dto.filter.username && dto.filter.usernameRegex)
            return {
               error: {
                  type: "BadRequest", message: 'Invalid query. Provide either username or' +
                     ' username regex.',
               },
            };

      if (dto.timestamps) {
         if (dto.timestamps.createdAt) {
            if (dto.timestamps.createdAt.start && isNaN(Date.parse(dto.timestamps.createdAt.start)))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid createdAt start' +
                        ' date. Provide a valid ISO date string.',
                  },
               };
            if (dto.timestamps.createdAt.end && isNaN(Date.parse(dto.timestamps.createdAt.end)))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid createdAt end' +
                        ' date. Provide a valid ISO date string.',
                  },
               };
         }
         if (dto.timestamps.updatedAt) {
            if (dto.timestamps.updatedAt.start && isNaN(Date.parse(dto.timestamps.updatedAt.start)))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid updatedAt start' +
                        ' date. Provide a valid ISO date string.',
                  },
               };
            if (dto.timestamps.updatedAt.end && isNaN(Date.parse(dto.timestamps.updatedAt.end)))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid updatedAt end' +
                        ' date. Provide a valid ISO date string.',
                  },
               };
         }
      }

      if (dto.sort) {
         if (dto.sort.field && !dto.sort.order)
            return { error: { type: "BadRequest", message: 'Invalid sort. Provide sort order.' } };
         if (!dto.sort.field && dto.sort.order)
            return { error: { type: "BadRequest", message: 'Invalid sort. Provide sort field.' } };
         if (dto.sort.field !== "username"
            && dto.sort.field !== "createdAt"
            && dto.sort.field !== "updatedAt")
            return {
               error: {
                  type: "BadRequest", message: 'Invalid sort. Sort field must be' +
                     ' "username", "createdAt", or "updatedAt".',
               },
            };
         if (dto.sort.order !== "asc" && dto.sort.order !== "desc")
            return {
               error: {
                  type: "BadRequest", message: 'Invalid sort. Sort order must be' +
                     ' "asc" or "desc".',
               },
            };
      }

      if (dto.page) {
         if (dto.page.index && !dto.page.limit)
            return { error: { type: "BadRequest", message: 'Invalid page. Provide page limit.' } };
         if (!dto.page.index && dto.page.limit)
            return { error: { type: "BadRequest", message: 'Invalid page. Provide page index.' } };
         if (dto.page.index < 0)
            return {
               error: {
                  type: "BadRequest", message: 'Invalid page. Page index must be' +
                     ' 0 or greater.',
               },
            };
         if (dto.page.limit < 1)
            return {
               error: {
                  type: "BadRequest", message: 'Invalid page. Page limit must be' +
                     ' 1 or greater.',
               },
            };
      }

      return null;
   },

   validateUpdateUserDto: async (dto: UpdateUserDTO): Promise<ValidationError | null> => {
      if (!dto.username)
         return { error: { type: "BadRequest", message: 'Username required.' } };

      if (!(await repository.exists(dto.username)))
         return { error: { type: "NotFound", message: `User "${dto.username}" not found.` } };

      if (!dto.updateFields)
         return {
            error: {
               type: "BadRequest", message: 'Invalid request. Update field(s)' +
                  ' required.',
            },
         };

      return null;
   },

   validateDeleteUserDto: async (dto: DeleteUserDTO): Promise<ValidationError | null> => {
      if (!dto.username)
         return { error: { type: "BadRequest", message: 'Username required.' } };
      if (!(await repository.exists(dto.username)))
         return { error: { type: "NotFound", message: `User "${dto.username}" not found.` } };
      return null;
   },
});
