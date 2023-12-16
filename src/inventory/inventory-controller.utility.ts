import {Controller, Method, Request, Response} from "@hals/core";
import {InventoryService} from "./inventory.service";

export const InventoryQueryParamsKeys: string[] = [
    'countRange',
];

const getRecordsMethod = (getRecords: (request: Request) => Promise<Response>): Method => ({
    type: "GET",
    paramKeys: [],
    queryParamKeys: InventoryQueryParamsKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: getRecords
});

const getRecordMethod = (getRecord: (request: Request) => Promise<Response>): Method => ({
    type: "GET",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: getRecord
});

const createRecordMethod = (createRecord: (request: Request) => Promise<Response>): Method => ({
    type: "POST",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: createRecord
});

const updateRecordsMethod = (updateRecords: (request: Request) => Promise<Response>): Method => ({
    type: "PATCH",
    paramKeys: [],
    queryParamKeys: InventoryQueryParamsKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: updateRecords
});

const updateRecordMethod = (updateRecord: (request: Request) => Promise<Response>): Method => ({
    type: "PATCH",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: updateRecord
});

const deleteRecordsMethod = (deleteRecords: (request: Request) => Promise<Response>): Method => ({
    type: "DELETE",
    paramKeys: [],
    queryParamKeys: InventoryQueryParamsKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: deleteRecords
});

const deleteRecordMethod = (deleteRecord: (request: Request) => Promise<Response>): Method => ({
    type: "DELETE",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: deleteRecord
});

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
