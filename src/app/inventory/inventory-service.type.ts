import {RequestHandler} from "@hals/core";

export type InventoryService = {
    getRecord: RequestHandler,
    getRecords: RequestHandler,
    createRecord: RequestHandler,
    updateRecord: RequestHandler,
    updateRecords: RequestHandler,
    deleteRecord: RequestHandler,
    deleteRecords: RequestHandler,
};
