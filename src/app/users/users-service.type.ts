import { RequestHandler } from "@hals/core";

export type UsersService = {
   getUser: RequestHandler,
   getUsers: RequestHandler,
   updateUser: RequestHandler,
   updateUsers: RequestHandler,
   deleteUser: RequestHandler,
   deleteUsers: RequestHandler,
};
