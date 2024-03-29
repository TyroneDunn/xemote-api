import {
   addPageDataToResponse,
   CommandResult,
   Error,
   isError,
   mapDeleteResultToResponse,
   mapErrorToInternalServerErrorResponse,
   mapRequestToPage,
   mapRequestToTimestamps,
   OK,
   OrderOption,
   Request,
   Response,
   User,
} from "@hals/common";
import {
   DeleteUserRequest,
   GetUserRequest,
   UpdateUserRequest,
   UsersRequest,
   UsersSortOption,
} from "./users.type";
import { DeleteUser, DeleteUsers, GetUser, GetUsers, UpdateUser } from './users-repository.type';

export const mapRequestToGetUserRequest = (request : Request) : GetUserRequest =>
   ({ username : request.paramMap['username'] });

export const mapUserToSuccessResponse = (user : User) : Response => ({
   status     : OK,
   collection : [ user ],
   count      : 1,
});

export const mapRequestToUsersRequest = (request : Request) : UsersRequest => ({
   ...mapRequestToUsersFilter(request),
   ...mapRequestToTimestamps(request),
   ...mapRequestToUsersSort(request),
   ...mapRequestToPage(request),
});

const mapRequestToUsersFilter = (request : Request) => ({
   filter: {
      ...request.queryParamMap['username']
      && { username: request.queryParamMap['username'] },
      ...request.queryParamMap['usernameRegex']
      && { usernameRegex: request.queryParamMap['usernameRegex'] },
   },
});

const mapRequestToUsersSort = (request : Request) => ({
   ...(request.queryParamMap['sort'] && request.queryParamMap['order']) && {
      sort: {
         field: request.queryParamMap['sort'] as UsersSortOption,
         order: request.queryParamMap['order'] as OrderOption,
      },
   },
});

export const mapUsersToSuccessResponse = (users : User[]) : Response => ({
   status     : OK,
   collection : [ users ],
   count      : users.length,
});

export const mapRequestToUpdateUserRequest = (request : Request) : UpdateUserRequest => ({
   username : request.paramMap['username'],
   ...mapRequestToUserUpdateFields(request),
});

const mapRequestToUserUpdateFields = (request : Request) => ({
   updateFields : {
      ...request.payload['newUsername'] && { newUsername: request.payload['newUsername'] },
      ...request.payload['newPassword'] && { newPassword: request.payload['newPassword'] },
   },
});

export const mapRequestToDeleteUserDto = (request : Request) : DeleteUserRequest =>
   ({ username : request.paramMap['username'] });

export const getUserAndMapResultToResponse = (getUser : GetUser) =>
   async (getUserRequest : GetUserRequest) : Promise<Response> => {
      const getUserResult : User | Error = await getUser(getUserRequest);
      if (isError(getUserResult)) return mapErrorToInternalServerErrorResponse(getUserResult);
      else return mapUserToSuccessResponse(getUserResult);
   };

export const getUsersAndMapResultToResponse = (getUsers : GetUsers) =>
   async (usersRequest : UsersRequest) : Promise<Response> => {
      const getUsersResult : User[] | Error = await getUsers(usersRequest);
      if (isError(getUsersResult)) return mapErrorToInternalServerErrorResponse(getUsersResult);
      const response : Response = mapUsersToSuccessResponse(getUsersResult);
      if (usersRequest.page !== undefined)
         return addPageDataToResponse(usersRequest.page, response);
      else return response;
   };

export const updateUserAndMapResultToResponse = (updateUser : UpdateUser) =>
   async (updateUserRequest : UpdateUserRequest) : Promise<Response> => {
      const updateUserResult : User | Error = await updateUser(updateUserRequest);
      if (isError(updateUserResult)) return mapErrorToInternalServerErrorResponse(updateUserResult);
      return mapUserToSuccessResponse(updateUserResult);
   };

export const deleteUserAndMapResultToResponse = (deleteUser : DeleteUser) =>
   async (deleteUserRequest : DeleteUserRequest) : Promise<Response> => {
      const deleteUserResult : CommandResult | Error = await deleteUser(deleteUserRequest);
      if (isError(deleteUserResult)) return mapErrorToInternalServerErrorResponse(deleteUserResult);
      return mapDeleteResultToResponse(deleteUserResult);
   };

export const deleteUsersAndMapResultToResponse = (deleteUsers : DeleteUsers) =>
   async (usersRequest : UsersRequest) : Promise<Response> => {
      const deleteUsersResult : CommandResult | Error = await deleteUsers(usersRequest);
      if (isError(deleteUsersResult)) return mapErrorToInternalServerErrorResponse(deleteUsersResult);
      return mapDeleteResultToResponse(deleteUsersResult);
   };
