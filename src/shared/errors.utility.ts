import {HttpStatusCodes, Response} from "@hals/core";

export const mapToInternalServerErrorResponse = (error): Response => ({
    status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    error: error.message,
});
