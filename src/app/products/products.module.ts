import { ProductsDtoValidator } from "./products-dto-validator.utility";
import { ProductsController } from "./products-controller.utility";
import { ProductsService } from "./products.service";
import { ProductsRepository } from "./products-repository.type";
import { MongoProductsRepository } from "./mongo-products-repository.service";
import { InventoryRepository } from "../inventory/inventory-repository.type";
import { MongoInventoryRepository } from "../inventory/mongo-inventory-repository.service";

const productsRepository : ProductsRepository = MongoProductsRepository;
const inventoryRepository : InventoryRepository = MongoInventoryRepository;
const productsDtoValidator : ProductsDtoValidator = ProductsDtoValidator(productsRepository);
const productsService : ProductsService =
   ProductsService(
      productsRepository,
      productsDtoValidator,
      inventoryRepository,
   );
const productsController : ProductsController = ProductsController(productsService);

export default productsController;
