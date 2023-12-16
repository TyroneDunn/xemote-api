import {
    Application,
    buildSchema,
    HashingAlgorithm,
    LocalStrategy,
    newApplication,
    NodeEnvironmentOption,
    Schema,
} from "@hals/core";
import {
    API_PORT,
    API_TITLE,
    API_VERSION,
    HASHING_ALGORITHM,
    HASHING_ITERATIONS,
    MONGODB_URL,
    NODE_ENV,
    PASSWORD_LENGTH,
    PASSWORD_SALT,
    SESSION_SECRET,
} from "../environments/environments";
import corsOptions from "./cors-options-config";
import productsController from "./products/products.module";
import inventoryController from "./inventory/inventory.module";
import ordersController from "./orders/orders.module";

const localAuthStrategy: LocalStrategy = {
    usersDbName: 'users',
    usersDbUrl: MONGODB_URL,
    usersDbOption: "MongoDB",
    sessionSecret: SESSION_SECRET,
    hashingAlgorithm: HASHING_ALGORITHM as HashingAlgorithm,
    hashingIterations: HASHING_ITERATIONS,
    passwordSalt: PASSWORD_SALT,
    passwordLength: PASSWORD_LENGTH,
};

export const schema: Schema = buildSchema(
    `${NODE_ENV as NodeEnvironmentOption}`,
    "Express",
    `${API_TITLE}`,
    `${API_VERSION}`,
    API_PORT,
    corsOptions,
    localAuthStrategy
);

const app: Application = newApplication(schema, [
    productsController,
    inventoryController,
    ordersController,
]);

export default app;
