import { configureOrdersController, OrdersController } from "./orders-controller.utility";
import { OrdersService } from "./orders.service";
import { MongoOrdersRepository } from "./mongo-orders-repository.service";
import { configureOrdersDtosValidator, OrdersDtosValidator } from "./orders-dtos-validator.utility";
import { MongoProductsRepository } from "../products/mongo-products-repository.service";

const ordersDtosValidator: OrdersDtosValidator = configureOrdersDtosValidator(MongoOrdersRepository, MongoProductsRepository);
const ordersService: OrdersService = OrdersService(MongoOrdersRepository, ordersDtosValidator);
const ordersController: OrdersController = configureOrdersController(ordersService);

export default ordersController;
