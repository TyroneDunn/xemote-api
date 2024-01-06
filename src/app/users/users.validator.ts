import { ValidationError } from "@hals/common";
import { DeleteUserRequest, GetUserRequest, UpdateUserRequest, UsersRequest } from "./users.type";
import { UsersRepository } from "./users-repository.type";

export type UsersValidator = {
   validateGetUserRequest: (request: GetUserRequest) => Promise<ValidationError | null>,
   validateUsersRequest: (request: UsersRequest) => Promise<ValidationError | null>,
   validateUpdateUserRequest: (request: UpdateUserRequest) => Promise<ValidationError | null>,
   validateDeleteUserRequest: (request: DeleteUserRequest) => Promise<ValidationError | null>,
};

export const UsersValidator = (repository: UsersRepository): UsersValidator => ({
   validateGetUserRequest: async (request: GetUserRequest): Promise<ValidationError | null> => {
      if (!request.username)
         return { error: { type: "BadRequest", message: 'Username required.' } };
      if (!(await repository.exists(request.username)))
         return { error: { type: "NotFound", message: `User "${request.username}" not found.` } };
      return null;
   },

   validateUsersRequest: async (request: UsersRequest): Promise<ValidationError | null> => {
      if (request.filter)
         if (request.filter.username && request.filter.usernameRegex)
            return {
               error: {
                  type: "BadRequest", message: 'Invalid query. Provide either username or' +
                     ' username regex.',
               },
            };

      if (request.timestamps) {
         if (request.timestamps.createdAt) {
            if (request.timestamps.createdAt.start && isNaN(Date.parse(request.timestamps.createdAt.start)))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid createdAt start' +
                        ' date. Provide a valid ISO date string.',
                  },
               };
            if (request.timestamps.createdAt.end && isNaN(Date.parse(request.timestamps.createdAt.end)))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid createdAt end' +
                        ' date. Provide a valid ISO date string.',
                  },
               };
         }
         if (request.timestamps.updatedAt) {
            if (request.timestamps.updatedAt.start && isNaN(Date.parse(request.timestamps.updatedAt.start)))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid updatedAt start' +
                        ' date. Provide a valid ISO date string.',
                  },
               };
            if (request.timestamps.updatedAt.end && isNaN(Date.parse(request.timestamps.updatedAt.end)))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid updatedAt end' +
                        ' date. Provide a valid ISO date string.',
                  },
               };
         }
      }

      if (request.sort) {
         if (request.sort.field && !request.sort.order)
            return { error: { type: "BadRequest", message: 'Invalid sort. Provide sort order.' } };
         if (!request.sort.field && request.sort.order)
            return { error: { type: "BadRequest", message: 'Invalid sort. Provide sort field.' } };
         if (request.sort.field !== "username"
            && request.sort.field !== "createdAt"
            && request.sort.field !== "updatedAt")
            return {
               error: {
                  type: "BadRequest", message: 'Invalid sort. Sort field must be' +
                     ' "username", "createdAt", or "updatedAt".',
               },
            };
         if (request.sort.order !== "asc" && request.sort.order !== "desc")
            return {
               error: {
                  type: "BadRequest", message: 'Invalid sort. Sort order must be' +
                     ' "asc" or "desc".',
               },
            };
      }

      if (request.page) {
         if (request.page.index && !request.page.limit)
            return { error: { type: "BadRequest", message: 'Invalid page. Provide page limit.' } };
         if (!request.page.index && request.page.limit)
            return { error: { type: "BadRequest", message: 'Invalid page. Provide page index.' } };
         if (request.page.index < 0)
            return {
               error: {
                  type: "BadRequest", message: 'Invalid page. Page index must be' +
                     ' 0 or greater.',
               },
            };
         if (request.page.limit < 1)
            return {
               error: {
                  type: "BadRequest", message: 'Invalid page. Page limit must be' +
                     ' 1 or greater.',
               },
            };
      }

      return null;
   },

   validateUpdateUserRequest: async (request: UpdateUserRequest): Promise<ValidationError | null> => {
      if (!request.username)
         return { error: { type: "BadRequest", message: 'Username required.' } };

      if (!(await repository.exists(request.username)))
         return { error: { type: "NotFound", message: `User "${request.username}" not found.` } };

      if (!request.updateFields)
         return {
            error: {
               type: "BadRequest", message: 'Invalid request. Update field(s)' +
                  ' required.',
            },
         };

      return null;
   },

   validateDeleteUserRequest: async (request: DeleteUserRequest): Promise<ValidationError | null> => {
      if (!request.username)
         return { error: { type: "BadRequest", message: 'Username required.' } };
      if (!(await repository.exists(request.username)))
         return { error: { type: "NotFound", message: `User "${request.username}" not found.` } };
      return null;
   },
});
