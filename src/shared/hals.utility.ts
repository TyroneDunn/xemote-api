import {HttpStatusCodes, Request, Response} from "@hals/core";

export const mapToInternalServerErrorResponse = (error): Response => ({
    status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    error: error.message,
});

export const addRequestPageDataToResponse = (request: Request, response: Response): Response =>
    ({
        ...response,
        index: parseInt(request.queryParamMap['index']),
        limit: parseInt(request.queryParamMap['limit']),
    });
