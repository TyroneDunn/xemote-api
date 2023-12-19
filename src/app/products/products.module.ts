import {
   configureProductsDtoValidator,
   ProductsDtoValidator,
} from "./products-dto-validator.utility";
import { configureProductsController, ProductsController } from "./products-controller.utility";
import { configureProductsService } from "./products-service.utility";
import { ProductsRepository } from "./products-repository.type";
import { MongoProductsRepository } from "./mongo-products-repository.service";
import { ProductsService } from "./products-service.type";
import { InventoryRepository } from "../inventory/inventory-repository.type";
import { MongoInventoryRepository } from "../inventory/mongo-inventory-repository.service";

const productsRepository: ProductsRepository = MongoProductsRepository;
const inventoryRepository: InventoryRepository = MongoInventoryRepository;
const productsDtoValidator: ProductsDtoValidator = configureProductsDtoValidator(productsRepository);
const productsService: ProductsService = configureProductsService(productsRepository, productsDtoValidator, inventoryRepository);
const productsController: ProductsController = configureProductsController(productsService);

export default productsController;
