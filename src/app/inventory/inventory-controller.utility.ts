import { Controller, Method, RequestHandler } from "@hals/common";
import { InventoryService } from "./inventory-service.type";

export const InventoryQueryParamsKeys: string[] = [
   'countRange',
];

const getRecordsMethod = (getRecords: RequestHandler): Method => ({
   type: "GET",
   paramKeys: [],
   queryParamKeys: InventoryQueryParamsKeys,
   sideEffects: [],
   middleware: [],
   requestHandler: getRecords,
});

const getRecordMethod = (getRecord: RequestHandler): Method => ({
   type: "GET",
   paramKeys: [ 'id' ],
   queryParamKeys: [],
   sideEffects: [],
   middleware: [],
   requestHandler: getRecord,
});

const updateRecordsMethod = (updateRecords: RequestHandler): Method => ({
   type: "PATCH",
   paramKeys: [],
   queryParamKeys: InventoryQueryParamsKeys,
   sideEffects: [],
   middleware: [],
   requestHandler: updateRecords,
});

const updateRecordMethod = (updateRecord: RequestHandler): Method => ({
   type: "PATCH",
   paramKeys: [ 'id' ],
   queryParamKeys: [],
   sideEffects: [],
   middleware: [],
   requestHandler: updateRecord,
});

export type InventoryController = Controller;

export const configureInventoryController = (service: InventoryService): Controller => ({
   path: 'inventory/',
   guard: true,
   methods: [
      getRecordsMethod(service.getRecords),
      getRecordMethod(service.getRecord),
      updateRecordsMethod(service.updateRecords),
      updateRecordMethod(service.updateRecord),
   ],
});
