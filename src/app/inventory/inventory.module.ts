import { InventoryController } from "./inventory.controller";
import { InventoryService } from "./inventory.service";
import { MongoInventoryRepository } from "./mongo-inventory-repository.service";
import {
   configureInventoryRecordsDtosValidator,
   InventoryRecordsDtosValidator,
} from "./inventory-records-dtos-validator.utility";
import { InventoryRepository } from "./inventory-repository.type";
import { Controller } from '@hals/common';

const inventoryRepository: InventoryRepository = MongoInventoryRepository;
const inventoryDtosValidator: InventoryRecordsDtosValidator
   = configureInventoryRecordsDtosValidator(inventoryRepository);
const inventoryService: InventoryService
   = InventoryService(inventoryRepository, inventoryDtosValidator);
const inventoryController: Controller = InventoryController(inventoryService);

export default inventoryController;
