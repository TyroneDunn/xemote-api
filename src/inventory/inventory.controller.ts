import {Controller, Method} from "@hals/core";
import {
    createRecord,
    deleteRecord,
    deleteRecords,
    getRecord,
    getRecords,
    updateRecord,
    updateRecords
} from "./inventory.service";

export const InventoryQueryParamsKeys: string[] = [
    'countRange',
];

const getRecordsMethod: Method = {
    type: "GET",
    paramKeys: [],
    queryParamKeys: InventoryQueryParamsKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: getRecords
};

const getRecordMethod: Method = {
    type: "GET",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: getRecord
};

const createRecordMethod: Method = {
    type: "POST",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: createRecord
};

const updateRecordsMethod: Method = {
    type: "PATCH",
    paramKeys: [],
    queryParamKeys: InventoryQueryParamsKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: updateRecords
};

const updateRecordMethod: Method = {
    type: "PATCH",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: updateRecord
};

const deleteRecordsMethod: Method = {
    type: "PATCH",
    paramKeys: [],
    queryParamKeys: InventoryQueryParamsKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: deleteRecords
};

const deleteRecordMethod: Method = {
    type: "PATCH",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: deleteRecord
};

export const InventoryController: Controller = {
    path: 'inventory/',
    guard: true,
    methods: [
        getRecordsMethod,
        getRecordMethod,
        createRecordMethod,
        updateRecordsMethod,
        updateRecordMethod,
        deleteRecordsMethod,
        deleteRecordMethod,
    ]
};
