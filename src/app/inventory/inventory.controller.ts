import { Controller, Method, RequestHandler } from "@hals/common";
import { InventoryService } from './inventory.service';

const getRecordsMethod = (getRecords : RequestHandler) : Method => ({
   type           : "GET",
   queryParamKeys : InventoryQueryParamsKeys,
   requestHandler : getRecords,
});

const getRecordMethod = (getRecord : RequestHandler) : Method => ({
   type           : "GET",
   paramKeys      : [ ID ],
   requestHandler : getRecord,
});

const updateRecordsMethod = (updateRecords : RequestHandler) : Method => ({
   type           : "PATCH",
   queryParamKeys : InventoryQueryParamsKeys,
   requestHandler : updateRecords,
});

const updateRecordMethod = (updateRecord : RequestHandler) : Method => ({
   type           : "PATCH",
   paramKeys      : [ ID ],
   requestHandler : updateRecord,
});

const ID : string = 'id';

export const InventoryQueryParamsKeys : string[] = [
   'countRange',
];

export const InventoryController = (service : InventoryService) : Controller => ({
   path    : 'inventory/',
   guard   : true,
   methods : [
      getRecordsMethod(service.getRecords),
      getRecordMethod(service.getRecord),
      updateRecordsMethod(service.updateRecords),
      updateRecordMethod(service.updateRecord),
   ],
});
