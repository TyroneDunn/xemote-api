import {Controller, Method, Request, Response} from "@hals/core";
import {OrdersService} from "./orders-service.type";

export const OrdersQueryParamsKeys: string[] = [
    'clientId',
    'status',
];

const getOrdersMethod = (getOrders: (request: Request) => Promise<Response>): Method => ({
    type: "GET",
    paramKeys: [],
    queryParamKeys: OrdersQueryParamsKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: getOrders
});

const getOrderMethod = (getOrder: (request: Request) => Promise<Response>): Method => ({
    type: "GET",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: getOrder
});

const createOrderMethod = (createOrder: (request: Request) => Promise<Response>): Method => ({
    type: "POST",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: createOrder
});

const updateOrdersMethod = (updateOrders: (request: Request) => Promise<Response>): Method => ({
    type: "PATCH",
    paramKeys: [],
    queryParamKeys: OrdersQueryParamsKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: updateOrders
});

const updateOrderMethod = (updateOrder: (request: Request) => Promise<Response>): Method => ({
    type: "PATCH",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: updateOrder
});

const deleteOrdersMethod = (deleteOrders: (request: Request) => Promise<Response>): Method => ({
    type: "DELETE",
    paramKeys: [],
    queryParamKeys: OrdersQueryParamsKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: deleteOrders
});

const deleteOrderMethod = (deleteOrder: (request: Request) => Promise<Response>): Method => ({
    type: "DELETE",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: deleteOrder
})

export type OrdersController = Controller;

export const configureOrdersController= (service: OrdersService): Controller => ({
    path: 'orders/',
    guard: true,
    methods: [
        getOrdersMethod(service.getOrders),
        getOrderMethod(service.getOrder),
        createOrderMethod(service.createOrder),
        updateOrdersMethod(service.updateOrders),
        updateOrderMethod(service.updateOrder),
        deleteOrdersMethod(service.deleteOrders),
        deleteOrderMethod(service.deleteOrder)
    ]
});
