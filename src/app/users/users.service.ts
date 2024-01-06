import { UsersRepository } from "./users-repository.type";
import {
   CommandResult,
   Error,
   handleRequest,
   isError,
   isValidationError,
   mapDeleteResultToResponse,
   mapErrorToInternalServerErrorResponse,
   mapValidationErrorToErrorResponse,
   Request,
   RequestHandler,
   Response,
   ValidationError,
} from "@hals/common";
import { DeleteUserRequest, UsersRequest } from "./users.type";
import { UsersValidator } from "./users.validator";
import {
   getUserAndMapResultToResponse,
   getUsersAndMapResultToResponse,
   mapRequestToDeleteUserDto,
   mapRequestToGetUserDto,
   mapRequestToUpdateUserDto,
   mapRequestToUsersDto,
   updateUserAndMapResultToResponse,
} from "./users.utility";

export type UsersService = {
   getUser : RequestHandler,
   getUsers : RequestHandler,
   updateUser : RequestHandler,
   deleteUser : RequestHandler,
   deleteUsers : RequestHandler,
};

export const configureUsersService = (
   repository: UsersRepository,
   validator: UsersValidator,
): UsersService => ({
   getUser: async (request: Request): Promise<Response> => handleRequest(
      mapRequestToGetUserDto(request),
      validator.validateGetUserRequest,
      getUserAndMapResultToResponse(repository.getUser),
   ),

   getUsers: async (request: Request): Promise<Response> => handleRequest(
      mapRequestToUsersDto(request),
      validator.validateUsersRequest,
      getUsersAndMapResultToResponse(repository.getUsers),
   ),

   updateUser: async (request: Request): Promise<Response> => handleRequest(
      mapRequestToUpdateUserDto(request),
      validator.validateUpdateUserRequest,
      updateUserAndMapResultToResponse(repository.updateUser),
   ),

   deleteUser: async (request: Request): Promise<Response> => {
      const dto: DeleteUserRequest = mapRequestToDeleteUserDto(request);
      const validationOutcome: ValidationError | null = await validator.validateDeleteUserRequest(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: CommandResult | Error = await repository.deleteUser(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapDeleteResultToResponse(result);
   },

   deleteUsers: async (request: Request): Promise<Response> => {
      const dto: UsersRequest = mapRequestToUsersDto(request);
      const validationOutcome: ValidationError | null = await validator.validateUsersRequest(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: CommandResult | Error = await repository.deleteUsers(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapDeleteResultToResponse(result);
   },
});
