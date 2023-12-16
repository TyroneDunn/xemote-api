import {Application, buildSchema, newApplication, NodeEnvironmentOption, Schema} from "@hals/core";
import {API_PORT, API_TITLE, API_VERSION, NODE_ENV} from "../environments";
import corsOptions from "./cors-options-config";
import authStrategy from "./auth-strategy-config";
import productsController from "./products/products.module";
import inventoryController from "./inventory/inventory.module";
import ordersController from "./orders/orders.module";

export const schema: Schema = buildSchema(
    `${NODE_ENV as NodeEnvironmentOption}`,
    "Express",
    `${API_TITLE}`,
    `${API_VERSION}`,
    API_PORT,
    corsOptions,
    authStrategy
);

const app: Application = newApplication(schema, [
    productsController,
    inventoryController,
    ordersController,
]);

export default app;
