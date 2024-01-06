import { Controller, Method, RequestHandler } from "@hals/common";

import { UsersService } from './users.service';

const UserQueryParamKeys: string[] = [
   'username',
   'usernameRegex',
];

const getUsersMethod = (getUsers: RequestHandler): Method => ({
   type: "GET",
   paramKeys: [],
   queryParamKeys: UserQueryParamKeys,
   sideEffects: [],
   middleware: [],
   requestHandler: getUsers,
});

const getUserMethod = (getUser: RequestHandler): Method => ({
   type: "GET",
   paramKeys: [ 'username' ],
   queryParamKeys: [],
   sideEffects: [],
   middleware: [],
   requestHandler: getUser,
});

const updateUserMethod = (updateUser: RequestHandler): Method => ({
   type: "PATCH",
   paramKeys: [ 'username' ],
   queryParamKeys: [],
   sideEffects: [],
   middleware: [],
   requestHandler: updateUser,
});

const deleteUsersMethod = (deleteUsers: RequestHandler): Method => ({
   type: "DELETE",
   paramKeys: [],
   queryParamKeys: UserQueryParamKeys,
   sideEffects: [],
   middleware: [],
   requestHandler: deleteUsers,
});

const deleteUserMethod = (deleteUser: RequestHandler): Method => ({
   type: "DELETE",
   paramKeys: [ 'username' ],
   queryParamKeys: [],
   sideEffects: [],
   middleware: [],
   requestHandler: deleteUser,
});

export const configureUsersController = (service: UsersService): Controller => ({
   path: 'users/',
   guard: true,
   methods: [
      getUsersMethod(service.getUsers),
      getUserMethod(service.getUser),
      updateUserMethod(service.updateUser),
      deleteUsersMethod(service.deleteUsers),
      deleteUserMethod(service.deleteUser),
   ],
});
