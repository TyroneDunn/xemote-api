import {configureOrdersController, OrdersController} from "./orders-controller.utility";
import {OrdersService} from "./orders-service.type";
import {configureOrdersService} from "./orders-service.utility";
import {OrdersRepository} from "./orders-repository.type";
import {MongoOrdersRepository} from "./mongo-orders-repository.service";
import {configureOrdersDtosValidator, OrdersDtosValidator} from "./orders-dtos-validator.service";

const ordersRepository: OrdersRepository = MongoOrdersRepository;
const ordersDtosValidator: OrdersDtosValidator = configureOrdersDtosValidator(ordersRepository);
const ordersService: OrdersService = configureOrdersService(ordersRepository, ordersDtosValidator);
const ordersController: OrdersController = configureOrdersController(ordersService);

export default ordersController;

