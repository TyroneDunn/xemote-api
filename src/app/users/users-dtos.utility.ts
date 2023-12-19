import { Request } from "@hals/core";
import { GetUserDTO } from "./users-dtos.type";

export const mapRequestToGetUserDto = (request: Request): GetUserDTO =>
   ({ username: request.paramMap['username'] });