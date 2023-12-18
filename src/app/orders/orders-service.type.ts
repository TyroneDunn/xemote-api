import {RequestHandler} from "@hals/core";

export type OrdersService = {
    getOrder: RequestHandler,
    getOrders: RequestHandler,
    createOrder: RequestHandler,
    updateOrder: RequestHandler,
    updateOrders: RequestHandler,
    deleteOrder: RequestHandler,
    deleteOrders: RequestHandler,
};
