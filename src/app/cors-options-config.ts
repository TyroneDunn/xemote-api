import {CorsOptions} from "cors";
import {APP_URL} from "../environments/environments";
import {HttpStatusCodes} from "@hals/core";

const corsOptions: CorsOptions = {
    origin: [
        '*',
        APP_URL,
    ],
    allowedHeaders: 'Content-Type,credentials',
    credentials: true,
    optionsSuccessStatus: HttpStatusCodes.OK,
    methods: ["GET", "POST", "DELETE", "PATCH"],
};

export default corsOptions;
