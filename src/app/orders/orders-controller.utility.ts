import { Controller, Method, RequestHandler } from "@hals/common";
import { OrdersService } from "./orders-service.type";

export const OrdersQueryParamsKeys: string[] = [
   'clientId',
   'status',
];

const getOrdersMethod = (getOrders: RequestHandler): Method => ({
   type: "GET",
   paramKeys: [],
   queryParamKeys: OrdersQueryParamsKeys,
   sideEffects: [],
   middleware: [],
   requestHandler: getOrders,
});

const getOrderMethod = (getOrder: RequestHandler): Method => ({
   type: "GET",
   paramKeys: [ 'id' ],
   queryParamKeys: [],
   sideEffects: [],
   middleware: [],
   requestHandler: getOrder,
});

const createOrderMethod = (createOrder: RequestHandler): Method => ({
   type: "POST",
   paramKeys: [],
   queryParamKeys: [],
   sideEffects: [],
   middleware: [],
   requestHandler: createOrder,
});

const updateOrdersMethod = (updateOrders: RequestHandler): Method => ({
   type: "PATCH",
   paramKeys: [],
   queryParamKeys: OrdersQueryParamsKeys,
   sideEffects: [],
   middleware: [],
   requestHandler: updateOrders,
});

const updateOrderMethod = (updateOrder: RequestHandler): Method => ({
   type: "PATCH",
   paramKeys: [ 'id' ],
   queryParamKeys: [],
   sideEffects: [],
   middleware: [],
   requestHandler: updateOrder,
});

const deleteOrdersMethod = (deleteOrders: RequestHandler): Method => ({
   type: "DELETE",
   paramKeys: [],
   queryParamKeys: OrdersQueryParamsKeys,
   sideEffects: [],
   middleware: [],
   requestHandler: deleteOrders,
});

const deleteOrderMethod = (deleteOrder: RequestHandler): Method => ({
   type: "DELETE",
   paramKeys: [ 'id' ],
   queryParamKeys: [],
   sideEffects: [],
   middleware: [],
   requestHandler: deleteOrder,
});

export type OrdersController = Controller;

export const configureOrdersController = (service: OrdersService): Controller => ({
   path: 'orders/',
   guard: true,
   methods: [
      getOrdersMethod(service.getOrders),
      getOrderMethod(service.getOrder),
      createOrderMethod(service.createOrder),
      updateOrdersMethod(service.updateOrders),
      updateOrderMethod(service.updateOrder),
      deleteOrdersMethod(service.deleteOrders),
      deleteOrderMethod(service.deleteOrder),
   ],
});
