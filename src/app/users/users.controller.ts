import { Controller, Method, RequestHandler } from "@hals/common";
import { UsersService } from './users.service';

const getUsersMethod = (getUsers: RequestHandler): Method => ({
   type: "GET",
   queryParamKeys: UserQueryParamKeys,
   requestHandler: getUsers,
});

const getUserMethod = (getUser: RequestHandler): Method => ({
   type: "GET",
   paramKeys: [ USERNAME ],
   requestHandler: getUser,
});

const updateUserMethod = (updateUser: RequestHandler): Method => ({
   type: "PATCH",
   paramKeys: [ USERNAME ],
   requestHandler: updateUser,
});

const deleteUsersMethod = (deleteUsers: RequestHandler): Method => ({
   type: "DELETE",
   queryParamKeys: UserQueryParamKeys,
   requestHandler: deleteUsers,
});

const deleteUserMethod = (deleteUser: RequestHandler): Method => ({
   type: "DELETE",
   paramKeys: [ USERNAME ],
   requestHandler: deleteUser,
});

const USERNAME : string = 'username';

const UserQueryParamKeys: string[] = [
   'username',
   'usernameRegex',
];

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
