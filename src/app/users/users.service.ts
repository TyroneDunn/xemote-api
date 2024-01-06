import { UsersRepository } from "./users-repository.type";
import {
   addPageDataToResponse,
   CommandResult,
   Error,
   isError,
   isValidationError,
   mapDeleteResultToResponse,
   mapErrorToInternalServerErrorResponse,
   mapValidationErrorToErrorResponse,
   Request,
   RequestHandler,
   Response,
   User,
   ValidationError,
} from "@hals/common";
import { DeleteUserDTO, GetUserDTO, UpdateUserDTO, UsersDTO } from "./users.type";
import { UsersDtosValidator } from "./users.validator";
import {
   mapRequestToDeleteUserDto,
   mapRequestToGetUserDto,
   mapRequestToUpdateUserDto,
   mapRequestToUsersDto,
   mapUsersToSuccessResponse,
   mapUserToSuccessResponse,
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
   validator: UsersDtosValidator,
): UsersService => ({
   getUser: async (request: Request): Promise<Response> => {
      const dto: GetUserDTO = mapRequestToGetUserDto(request);
      const validationOutcome: ValidationError | null = await validator.validateGetUserDto(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: User | Error = await repository.getUser(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapUserToSuccessResponse(result);
   },

   getUsers: async (request: Request): Promise<Response> => {
      const dto: UsersDTO = await mapRequestToUsersDto(request);
      const validationOutcome: ValidationError | null = await validator.validateUsersDto(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: User[] | Error = await repository.getUsers(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      const response : Response = mapUsersToSuccessResponse(result);
      if (dto.page !== undefined)
         return addPageDataToResponse(dto.page, response)
      else return response;
   },

   updateUser: async (request: Request): Promise<Response> => {
      const dto: UpdateUserDTO = mapRequestToUpdateUserDto(request);
      const validationOutcome: ValidationError | null = await validator.validateUpdateUserDto(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: User | Error = await repository.updateUser(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapUserToSuccessResponse(result);
   },

   deleteUser: async (request: Request): Promise<Response> => {
      const dto: DeleteUserDTO = mapRequestToDeleteUserDto(request);
      const validationOutcome: ValidationError | null = await validator.validateDeleteUserDto(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: CommandResult | Error = await repository.deleteUser(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapDeleteResultToResponse(result);
   },

   deleteUsers: async (request: Request): Promise<Response> => {
      const dto: UsersDTO = mapRequestToUsersDto(request);
      const validationOutcome: ValidationError | null = await validator.validateUsersDto(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: CommandResult | Error = await repository.deleteUsers(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapDeleteResultToResponse(result);
   },
});
