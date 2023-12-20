import { configureUsersController, UsersController } from "./users-controller.utility";
import { UsersService } from "./users-service.type";
import { MongoUsersRepository } from "./mongo-users-repository.service";
import { UsersRepository } from "./users-repository.type";
import { configureUsersDtosValidator, UsersDtosValidator } from "./users-dtos-validator.utility";
import { configureUsersService } from "./users-service.utility";

const usersRepository: UsersRepository = MongoUsersRepository;
const usersDtosValidator: UsersDtosValidator = configureUsersDtosValidator(usersRepository);
const usersService: UsersService = configureUsersService(usersRepository, usersDtosValidator);
const usersController: UsersController = configureUsersController(usersService);

export default usersController;
