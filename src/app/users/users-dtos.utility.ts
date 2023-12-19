import { Request, Response } from "@hals/core";
import { GetUserDTO } from "./users-dtos.type";
import { User } from "./user.type";
import { OK } from "@hals/common";

export const mapRequestToGetUserDto = (request: Request): GetUserDTO =>
   ({ username: request.paramMap['username'] });

export const mapUserToSuccessResponse = (user: User): Response => ({
   status: OK,
   collection: [ user ],
   count: 1,
});