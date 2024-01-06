import { UsersRepository } from "./users-repository.type";
import { handleRequest, Request, RequestHandler, Response } from "@hals/common";
import { UsersValidator } from "./users.validator";
import {
   deleteUserAndMapResultToResponse,
   deleteUsersAndMapResultToResponse,
   getUserAndMapResultToResponse,
   getUsersAndMapResultToResponse,
   mapRequestToDeleteUserDto,
   mapRequestToGetUserRequest,
   mapRequestToUpdateUserRequest,
   mapRequestToUsersRequest,
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
      mapRequestToGetUserRequest(request),
      validator.validateGetUserRequest,
      getUserAndMapResultToResponse(repository.getUser),
   ),

   getUsers: async (request: Request): Promise<Response> => handleRequest(
      mapRequestToUsersRequest(request),
      validator.validateUsersRequest,
      getUsersAndMapResultToResponse(repository.getUsers),
   ),

   updateUser: async (request: Request): Promise<Response> => handleRequest(
      mapRequestToUpdateUserRequest(request),
      validator.validateUpdateUserRequest,
      updateUserAndMapResultToResponse(repository.updateUser),
   ),

   deleteUser: async (request: Request): Promise<Response> => handleRequest(
      mapRequestToDeleteUserDto(request),
      validator.validateDeleteUserRequest,
      deleteUserAndMapResultToResponse(repository.deleteUser),
   ),

   deleteUsers: async (request: Request): Promise<Response> => handleRequest(
      mapRequestToUsersRequest(request),
      validator.validateUsersRequest,
      deleteUsersAndMapResultToResponse(repository.deleteUsers),
   ),
});
