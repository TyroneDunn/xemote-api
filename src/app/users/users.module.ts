import { configureUsersController } from "./users.controller";
import { MongoUsersRepository } from "./mongo-users-repository.service";
import { UsersValidator } from "./users.validator";
import { configureUsersService, UsersService } from "./users.service";
import { Controller } from '@hals/common';

const usersValidator: UsersValidator = UsersValidator(MongoUsersRepository);
const usersService: UsersService = configureUsersService(MongoUsersRepository, usersValidator);
const usersController: Controller = configureUsersController(usersService);

export default usersController;
