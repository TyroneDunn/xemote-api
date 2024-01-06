import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { MongoOrdersRepository } from "./mongo-orders-repository.service";
import { OrdersValidator } from "./orders.validator";
import { MongoProductsRepository } from "../products/mongo-products-repository.service";
import { Controller } from '@hals/common';

const ordersValidator : OrdersValidator = OrdersValidator(MongoOrdersRepository, MongoProductsRepository);
const ordersService : OrdersService = OrdersService(MongoOrdersRepository, ordersValidator);
const ordersController : Controller = OrdersController(ordersService);

export default ordersController;
