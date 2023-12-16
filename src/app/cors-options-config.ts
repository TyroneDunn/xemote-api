import {CorsOptions} from "cors";
import {APP_URL} from "../environment";
import {HttpStatusCodes} from "@hals/core";

export const corsOptions: CorsOptions = {
    origin: [
        '*',
        APP_URL,
    ],
    allowedHeaders: 'Content-Type,credentials',
    credentials: true,
    optionsSuccessStatus: HttpStatusCodes.OK,
    methods: ["GET", "POST", "DELETE", "PATCH"],
};
