import {
    App,
    Config,
    buildAppConfig,
    NodeEnvironmentOption,
    HashingAlgorithm
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
} from "../environment/environment";
import {corsOptions} from "./cors-options-config";
import {ProductsController} from "../modules/products/products.controller";

export const config: Config = buildAppConfig(
    `${NODE_ENV as NodeEnvironmentOption}`,
    "Express",
    `${API_TITLE}`,
    `${API_VERSION}`,
    API_PORT,
    corsOptions,
    "Local",
    'MongoDB',
    MONGODB_URL,
    SESSION_SECRET,
    HASHING_ALGORITHM as HashingAlgorithm,
    HASHING_ITERATIONS,
    PASSWORD_LENGTH,
    PASSWORD_SALT
);

App.init(config, [
    ProductsController,
])

const run = App.run;
export default run;
