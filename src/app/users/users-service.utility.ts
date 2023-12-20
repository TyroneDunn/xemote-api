import { UsersRepository } from "./users-repository.type";
import { UsersService } from "./users-service.type";
import { Request, Response } from "@hals/core";
import {
   addRequestPageDataToResponse,
   CommandResult,
   Error,
   isError,
   mapDeleteResultToResponse,
   mapErrorToInternalServerErrorResponse,
   mapValidationOutcomeToErrorResponse,
   ValidationOutcome,
} from "@hals/common";
import { DeleteUserDTO, GetUserDTO, UpdateUserDTO, UsersDTO } from "./users-dtos.type";
import { User } from "./user.type";
import { UsersDtosValidator } from "./users-dtos-validator.utility";
import {
   mapRequestToDeleteUserDto,
   mapRequestToGetUserDto,
   mapRequestToUpdateUserDto,
   mapRequestToUsersDto,
   mapUsersToSuccessResponse,
   mapUserToSuccessResponse,
} from "./users-dtos.utility";

export const configureUsersService = (
   repository: UsersRepository,
   validator: UsersDtosValidator,
): UsersService =>
   ({
      getUser: async (request: Request): Promise<Response> => {
         const dto: GetUserDTO = mapRequestToGetUserDto(request);
         const validationOutcome: ValidationOutcome = await validator.validateGetUserDto(dto);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result: User | Error = await repository.getUser(dto);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         return mapUserToSuccessResponse(result);
      },

      getUsers: async (request: Request): Promise<Response> => {
         const dto: UsersDTO = await mapRequestToUsersDto(request);
         const validationOutcome: ValidationOutcome = await validator.validateUsersDto(dto);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result: User[] | Error = await repository.getUsers(dto);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         const addPageData = (response: Response): Response =>
            addRequestPageDataToResponse(request, response);
         return addPageData(mapUsersToSuccessResponse(result));
      },

      updateUser: async (request: Request): Promise<Response> => {
         const dto: UpdateUserDTO = mapRequestToUpdateUserDto(request);
         const validationOutcome: ValidationOutcome = await validator.validateUpdateUserDto(dto);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result: User | Error = await repository.updateUser(dto);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         return mapUserToSuccessResponse(result);
      },

      deleteUser: async (request: Request): Promise<Response> => {
         const dto: DeleteUserDTO = mapRequestToDeleteUserDto(request);
         const validationOutcome: ValidationOutcome = await validator.validateDeleteUserDto(dto);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result: CommandResult | Error = await repository.deleteUser(dto);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         return mapDeleteResultToResponse(result);
      },

      deleteUsers: async (request: Request): Promise<Response> => {
         const dto: UsersDTO = mapRequestToUsersDto(request);
         const validationOutcome: ValidationOutcome = await validator.validateUsersDto(dto);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result: CommandResult | Error = await repository.deleteUsers(dto);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         return mapDeleteResultToResponse(result);
      },
   });
