import {ValidationOutcome} from "./validation-dtos.type";
import {HttpStatusCodes, Response} from "@hals/core";
import {
    BadRequestError,
    ConflictError,
    ForbiddenError,
    NotFoundError,
    UnauthorizedError
} from "../errors/errors.type";

export const mapToErrorResponse = (validationOutcome: ValidationOutcome): Response => {
    if (validationOutcome.error instanceof BadRequestError) return ({
        status: HttpStatusCodes.BAD_REQUEST,
        error: validationOutcome.error.message,
    });
    if (validationOutcome.error instanceof NotFoundError) return {
        status: HttpStatusCodes.NOT_FOUND,
        error: validationOutcome.error.message,
    };
    if (validationOutcome.error instanceof UnauthorizedError) return {
        status: HttpStatusCodes.UNAUTHORIZED,
        error: validationOutcome.error.message,
    };
    if (validationOutcome.error instanceof ForbiddenError) return {
        status: HttpStatusCodes.FORBIDDEN,
        error: validationOutcome.error.message,
    };
    if (validationOutcome.error instanceof ConflictError) return {
        status: HttpStatusCodes.CONFLICT,
        error: validationOutcome.error.message,
    };
};
