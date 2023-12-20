import { RequestHandler } from "@hals/common";

export type UsersService = {
   getUser: RequestHandler,
   getUsers: RequestHandler,
   updateUser: RequestHandler,
   deleteUser: RequestHandler,
   deleteUsers: RequestHandler,
};
