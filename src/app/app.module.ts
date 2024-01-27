import { hals } from "@hals/core";
import { API_PORT, API_TITLE, API_VERSION, NODE_ENV } from "../environments";
import corsOptions from "./cors-options-config";
import authStrategy from "./auth-strategy-config";
import productsController from "./products/products.module";
import { Application, ApplicationSchema, NodeEnvironmentOption } from "@hals/common";

export const appSchema: ApplicationSchema = {
   nodeEnv: NODE_ENV as NodeEnvironmentOption,
   serverOption: "Express",
   title: API_TITLE,
   version: API_VERSION,
   host: '127.0.0.1',
   port: API_PORT,
   corsOptions: corsOptions,
   authStrategy: authStrategy,
   controllers: [
      productsController,
   ],
};

const app: Application = hals(appSchema);

export default app;
