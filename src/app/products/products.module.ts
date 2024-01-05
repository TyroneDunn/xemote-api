import { ProductsDtosValidator } from "./products-dtos.validator";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { ProductsRepository } from "./products-repository.type";
import { MongoProductsRepository } from "./mongo-products-repository.service";
import { InventoryRepository } from "../inventory/inventory-repository.type";
import { MongoInventoryRepository } from "../inventory/mongo-inventory-repository.service";

const productsRepository : ProductsRepository = MongoProductsRepository;
const inventoryRepository : InventoryRepository = MongoInventoryRepository;
const productsDtoValidator : ProductsDtosValidator = ProductsDtosValidator(productsRepository);
const productsService : ProductsService =
   ProductsService(
      productsRepository,
      productsDtoValidator,
      inventoryRepository,
   );
const productsController : ProductsController = ProductsController(productsService);

export default productsController;
