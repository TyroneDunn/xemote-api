import {Controller, Method} from "@hals/core";
import {
    createOrder,
    deleteOrder,
    deleteOrders,
    getOrder,
    getOrders,
    updateOrder,
    updateOrders
} from "./orders.service";

export const OrdersQueryParamsKeys: string[] = [
    'clientId',
    'status',
];

const getOrdersMethod: Method = {
    type: "GET",
    paramKeys: [],
    queryParamKeys: OrdersQueryParamsKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: getOrders
};

const getOrderMethod: Method = {
    type: "GET",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: getOrder
};

const createOrderMethod: Method = {
    type: "POST",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: createOrder
};

const updateOrdersMethod: Method = {
    type: "PATCH",
    paramKeys: [],
    queryParamKeys: OrdersQueryParamsKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: updateOrders
};

const updateOrderMethod: Method = {
    type: "PATCH",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: updateOrder
};

const deleteOrdersMethod: Method = {
    type: "DELETE",
    paramKeys: [],
    queryParamKeys: OrdersQueryParamsKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: deleteOrders
};

const deleteOrderMethod: Method = {
    type: "DELETE",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: deleteOrder
};

export const OrdersController: Controller = {
    path: 'orders/',
    guard: true,
    methods: [
        getOrdersMethod,
        getOrderMethod,
        createOrderMethod,
        updateOrdersMethod,
        updateOrderMethod,
        deleteOrdersMethod,
        deleteOrderMethod
    ]
};
