import { ProductsDtosValidator } from "./products-dtos.validator";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { MongoProductsRepository } from "./mongo-products-repository.service";
import { MongoInventoryRepository } from "../inventory/mongo-inventory-repository.service";

const productsService : ProductsService = ProductsService(
   MongoProductsRepository,
   ProductsDtosValidator(MongoProductsRepository),
   MongoInventoryRepository,
);
const productsController : ProductsController = ProductsController(productsService);

export default productsController;
