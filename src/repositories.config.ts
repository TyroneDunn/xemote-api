import {ProductsRepository} from "./products/products-repository.type";
import {MongoProductsRepository} from "./products/mongo-products-repository.service";
import {InventoryRepository} from "./inventory/inventory-repository.type";
import {MongoInventoryRepository} from "./inventory/mongo-inventory-repository.service";
import {OrdersRepository} from "./orders/orders-repository.type";
import {MongoOrdersRepository} from "./orders/mongo-orders-repository.service";

export const PRODUCTS_REPOSITORY: ProductsRepository = MongoProductsRepository;
export const INVENTORY_REPOSITORY: InventoryRepository = MongoInventoryRepository;
export const ORDERS_REPOSITORY: OrdersRepository = MongoOrdersRepository;
