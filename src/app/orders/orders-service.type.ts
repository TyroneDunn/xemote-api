import {Request, Response} from "@hals/core";

export type OrdersService = {
    getOrder: (request: Request) => Promise<Response>,
    getOrders: (request: Request) => Promise<Response>,
    createOrder: (request: Request) => Promise<Response>,
    updateOrder: (request: Request) => Promise<Response>,
    updateOrders: (request: Request) => Promise<Response>,
    deleteOrder: (request: Request) => Promise<Response>,
    deleteOrders: (request: Request) => Promise<Response>,
};
