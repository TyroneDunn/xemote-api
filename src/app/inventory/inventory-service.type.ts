import {Request, Response} from "@hals/core";

export type InventoryService = {
    getRecord: (request: Request) => Promise<Response>,
    getRecords: (request: Request) => Promise<Response>,
    createRecord: (request: Request) => Promise<Response>,
    updateRecord: (request: Request) => Promise<Response>,
    updateRecords: (request: Request) => Promise<Response>,
    deleteRecord: (request: Request) => Promise<Response>,
    deleteRecords: (request: Request) => Promise<Response>,
};
