import {RequestHandler} from "@hals/core";

export type InventoryService = {
    getRecord: RequestHandler,
    getRecords: RequestHandler,
    updateRecord: RequestHandler,
    updateRecords: RequestHandler,
};
