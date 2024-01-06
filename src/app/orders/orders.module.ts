import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { MongoOrdersRepository } from "./mongo-orders-repository.service";
import { configureOrdersDtosValidator, OrdersDtosValidator } from "./orders-dtos-validator.utility";
import { MongoProductsRepository } from "../products/mongo-products-repository.service";
import { Controller } from '@hals/common';

const ordersDtosValidator : OrdersDtosValidator = configureOrdersDtosValidator(MongoOrdersRepository, MongoProductsRepository);
const ordersService : OrdersService = OrdersService(MongoOrdersRepository, ordersDtosValidator);
const ordersController : Controller = OrdersController(ordersService);

export default ordersController;
