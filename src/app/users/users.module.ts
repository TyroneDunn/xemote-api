import { configureUsersController } from "./users.controller";
import { MongoUsersRepository } from "./mongo-users-repository.service";
import { UsersRepository } from "./users-repository.type";
import { configureUsersDtosValidator, UsersDtosValidator } from "./users.validator";
import { configureUsersService, UsersService } from "./users.service";
import { Controller } from '@hals/common';

const usersRepository: UsersRepository = MongoUsersRepository;
const usersDtosValidator: UsersDtosValidator = configureUsersDtosValidator(usersRepository);
const usersService: UsersService = configureUsersService(usersRepository, usersDtosValidator);
const usersController: Controller = configureUsersController(usersService);

export default usersController;
