import { Request, Response } from "@hals/core";
import { GetUserDTO, UsersDTO, UsersSortOption } from "./users-dtos.type";
import { User } from "./user.type";
import { mapRequestToPage, mapRequestToTimestamps, OK, OrderOption } from "@hals/common";

export const mapRequestToGetUserDto = (request: Request): GetUserDTO =>
   ({ username: request.paramMap['username'] });

export const mapUserToSuccessResponse = (user: User): Response => ({
   status: OK,
   collection: [ user ],
   count: 1,
});

export const mapRequestToUsersDto = (request: Request): UsersDTO => ({
   ...mapRequestToUsersFilter(request),
   ...mapRequestToTimestamps(request),
   ...mapRequestToUsersSort(request),
   ...mapRequestToPage(request),
});

const mapRequestToUsersFilter = (request: Request) => ({
   filter: {
      ...request.queryParamMap['username']
      && { username: request.queryParamMap['username'] },
      ...request.queryParamMap['usernameRegex']
      && { usernameRegex: request.queryParamMap['usernameRegex'] },
   },
});

const mapRequestToUsersSort = (request: Request) => {
   return {
      ...(request.queryParamMap['sort'] && request.queryParamMap['order']) && {
         sort: {
            field: request.queryParamMap['sort'] as UsersSortOption,
            order: request.queryParamMap['order'] as OrderOption,
         },
      },
   };
};
