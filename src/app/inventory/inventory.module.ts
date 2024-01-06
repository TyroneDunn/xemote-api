import { InventoryController } from "./inventory.controller";
import { InventoryService } from "./inventory.service";
import { MongoInventoryRepository } from "./mongo-inventory-repository.service";
import { InventoryRecordsValidator } from "./inventory-records.validator";
import { InventoryRepository } from "./inventory-repository.type";
import { Controller } from '@hals/common';

const inventoryRepository: InventoryRepository = MongoInventoryRepository;
const inventoryValidator: InventoryRecordsValidator
   = InventoryRecordsValidator(inventoryRepository);
const inventoryService: InventoryService
   = InventoryService(inventoryRepository, inventoryValidator);
const inventoryController: Controller = InventoryController(inventoryService);

export default inventoryController;
