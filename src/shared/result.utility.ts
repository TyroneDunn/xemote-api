import {Result} from "./result.type";
import {HttpStatusCodes, Response} from "@hals/core";

export const mapResultToSuccessResponse = (result: Result): Response => ({
    status: HttpStatusCodes.OK,
    count: result.affectedCount
});

export const mapUpdateResultToResponse = (result: Result): Response => ({
    status: result.success ? HttpStatusCodes.OK : HttpStatusCodes.INTERNAL_SERVER_ERROR,
    ...result.success && {count: result.affectedCount},
    ...(!result.success) && {
        error: 'Update Error: An unexpected error occurred. Please try' +
            ' again or contact support for assistance.'
    }
});

export const mapDeleteResultToResponse = (result: Result): Response => ({
    status: result.success && result.affectedCount > 0
        ? HttpStatusCodes.OK
        : result.success && result.affectedCount === 0
            ? HttpStatusCodes.NOT_FOUND
            : HttpStatusCodes.INTERNAL_SERVER_ERROR,
    ...result.success && {count: result.affectedCount},
    ...(!result.success) && {
        error: 'Delete Error: An unexpected error occurred. Please try again' +
            ' or contact support for assistance.'
    }
});
