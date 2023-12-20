import { RequestHandler } from "@hals/common";

export type InventoryService = {
   getRecord: RequestHandler,
   getRecords: RequestHandler,
   updateRecord: RequestHandler,
   updateRecords: RequestHandler,
};
