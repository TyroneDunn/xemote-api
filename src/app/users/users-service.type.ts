import { RequestHandler } from "@hals/core";

export type UsersService = {
   getUser: RequestHandler,
   getUsers: RequestHandler,
   updateUser: RequestHandler,
   deleteUser: RequestHandler,
   deleteUsers: RequestHandler,
};
