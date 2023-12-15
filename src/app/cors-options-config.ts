import {CorsOptions} from "cors";
import {APP_URL} from "../environment";
import {OK} from "../shared/http-status-code.constant";

export const corsOptions: CorsOptions = {
    origin: [
        '*',
        APP_URL,
    ],
    allowedHeaders: 'Content-Type,credentials',
    credentials: true,
    optionsSuccessStatus: OK,
    methods: ["GET", "POST", "DELETE", "PATCH"],
};
