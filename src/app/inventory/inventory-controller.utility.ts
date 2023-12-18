import {Controller, Method, RequestHandler} from "@hals/core";
import {InventoryService} from "./inventory-service.type";

export const InventoryQueryParamsKeys: string[] = [
    'countRange',
];

const getRecordsMethod = (getRecords: RequestHandler): Method => ({
    type: "GET",
    paramKeys: [],
    queryParamKeys: InventoryQueryParamsKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: getRecords
});

const getRecordMethod = (getRecord: RequestHandler): Method => ({
    type: "GET",
    paramKeys: ['id'],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: getRecord
});

const createRecordMethod = (createRecord: RequestHandler): Method => ({
    type: "POST",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: createRecord
});

const updateRecordsMethod = (updateRecords: RequestHandler): Method => ({
    type: "PATCH",
    paramKeys: [],
    queryParamKeys: InventoryQueryParamsKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: updateRecords
});

const updateRecordMethod = (updateRecord: RequestHandler): Method => ({
    type: "PATCH",
    paramKeys: ['id'],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: updateRecord
});

const deleteRecordsMethod = (deleteRecords: RequestHandler): Method => ({
    type: "DELETE",
    paramKeys: [],
    queryParamKeys: InventoryQueryParamsKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: deleteRecords
});

const deleteRecordMethod = (deleteRecord: RequestHandler): Method => ({
    type: "DELETE",
    paramKeys: ['id'],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: deleteRecord
});

export type InventoryController = Controller;

export const configureInventoryController = (service: InventoryService): Controller => ({
    path: 'inventory/',
    guard: true,
    methods: [
        getRecordsMethod(service.getRecords),
        getRecordMethod(service.getRecord),
        createRecordMethod(service.createRecord),
        updateRecordsMethod(service.updateRecords),
        updateRecordMethod(service.updateRecord),
        deleteRecordsMethod(service.deleteRecords),
        deleteRecordMethod(service.deleteRecord),
    ]
});
