import {Result} from "./result.type";
import {HttpStatusCodes, Response} from "@hals/core";

export const mapResultToSuccessResponse = (result: Result): Response => ({
    status: HttpStatusCodes.OK,
    count: result.affectedCount
});
