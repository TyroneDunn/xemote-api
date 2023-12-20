import { buildSchema, newApplication } from "@hals/core";
import { API_PORT, API_TITLE, API_VERSION, NODE_ENV } from "../environments";
import corsOptions from "./cors-options-config";
import authStrategy from "./auth-strategy-config";
import usersController from "./users/users.module";
import productsController from "./products/products.module";
import inventoryController from "./inventory/inventory.module";
import ordersController from "./orders/orders.module";
import { Application, ApplicationSchema } from "@hals/common";
import { NodeEnvironmentOption } from "@hals/common/lib/app/application-schema.type";

export const schema: ApplicationSchema = buildSchema(
   NODE_ENV as NodeEnvironmentOption,
   "Express",
   API_TITLE,
   API_VERSION,
   API_PORT,
   corsOptions,
   authStrategy,
);

const app: Application = newApplication(schema, [
   usersController,
   productsController,
   inventoryController,
   ordersController,
]);

export default app;
