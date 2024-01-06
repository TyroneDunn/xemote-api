import { ProductsValidator } from "./products.validator";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { MongoProductsRepository } from "./mongo-products-repository.service";
import { MongoInventoryRepository } from "../inventory/mongo-inventory-repository.service";
import { Controller } from '@hals/common';

const productsService : ProductsService = ProductsService(
   MongoProductsRepository,
   ProductsValidator(MongoProductsRepository),
   MongoInventoryRepository,
);
const productsController : Controller = ProductsController(productsService);

export default productsController;
