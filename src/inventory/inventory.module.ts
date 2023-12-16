import {configureInventoryController, InventoryController} from "./inventory-controller.utility";
import {configureInventoryService} from "./inventory-service.utility";
import {MongoInventoryRepository} from "./mongo-inventory-repository.service";
import {
    configureInventoryRecordsDtosValidator,
    InventoryRecordsDtosValidator
} from "./inventory-records-dtos-validator.utility";
import {InventoryRepository} from "./inventory-repository.type";
import {InventoryService} from "./inventory-service.type";

const inventoryRepository: InventoryRepository = MongoInventoryRepository;
const inventoryDtosValidator: InventoryRecordsDtosValidator
    = configureInventoryRecordsDtosValidator(inventoryRepository);
const inventoryService: InventoryService
    = configureInventoryService(inventoryRepository, inventoryDtosValidator);
const inventoryController: InventoryController = configureInventoryController(inventoryService);

export default inventoryController;