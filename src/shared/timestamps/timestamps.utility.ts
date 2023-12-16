import {Request} from "@hals/core";
import {DateRange} from "../date-range/date-range.type";

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
