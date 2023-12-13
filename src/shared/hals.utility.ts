import {HttpStatusCodes, Request, Response} from "@hals/core";
import {DateRange} from "./date-range.type";

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

export const mapRequestToTimestamps = (request: Request) => ({
    ...(request.queryParamMap['createdAt'] && !request.queryParamMap['updatedAt']) && {
        timestamps: {
            createdAt: (JSON.parse(request.queryParamMap['createdAt']) as DateRange)
        },
    },
    ...(request.queryParamMap['updatedAt'] && !request.queryParamMap['createdAt']) && {
        timestamps: {
            updatedAt: (JSON.parse(request.queryParamMap['updatedAt']) as DateRange)
        }
    },
    ...(request.queryParamMap['createdAt'] && request.queryParamMap['updatedAt']) && {
        timestamps: {
            createdAt: (JSON.parse(request.queryParamMap['createdAt']) as DateRange),
            updatedAt: (JSON.parse(request.queryParamMap['updatedAt']) as DateRange)
        },
    },
});
