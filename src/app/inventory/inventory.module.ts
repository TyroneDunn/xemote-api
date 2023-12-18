import {configureInventoryController, InventoryController} from "./inventory-controller.utility";
import {configureInventoryService} from "./inventory-service.utility";
import {MongoInventoryRepository} from "./mongo-inventory-repository.service";
import {
    configureInventoryRecordsDtosValidator,
    InventoryRecordsDtosValidator
} from "./inventory-records-dtos-validator.utility";
import {InventoryRepository} from "./inventory-repository.type";
import {InventoryService} from "./inventory-service.type";
import {ProductsRepository} from "../products/products-repository.type";
import {MongoProductsRepository} from "../products/mongo-products-repository.service";

const inventoryRepository: InventoryRepository = MongoInventoryRepository;
const productsRepository: ProductsRepository = MongoProductsRepository;
const inventoryDtosValidator: InventoryRecordsDtosValidator
    = configureInventoryRecordsDtosValidator(inventoryRepository, productsRepository);
const inventoryService: InventoryService
    = configureInventoryService(inventoryRepository, inventoryDtosValidator);
const inventoryController: InventoryController = configureInventoryController(inventoryService);

export default inventoryController;
