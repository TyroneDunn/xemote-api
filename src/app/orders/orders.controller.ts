import { Controller, Method, RequestHandler } from "@hals/common";
import { OrdersService } from './orders.service';

const getOrdersMethod = (getOrders : RequestHandler) : Method => ({
   type           : "GET",
   queryParamKeys : OrdersQueryParamsKeys,
   requestHandler : getOrders,
});

const getOrderMethod = (getOrder : RequestHandler) : Method => ({
   type           : "GET",
   paramKeys      : [ ID ],
   requestHandler : getOrder,
});

const createOrderMethod = (createOrder : RequestHandler) : Method => ({
   type           : "POST",
   requestHandler : createOrder,
});

const updateOrdersMethod = (updateOrders : RequestHandler) : Method => ({
   type           : "PATCH",
   queryParamKeys : OrdersQueryParamsKeys,
   requestHandler : updateOrders,
});

const updateOrderMethod = (updateOrder : RequestHandler) : Method => ({
   type           : "PATCH",
   paramKeys      : [ ID ],
   requestHandler : updateOrder,
});

const deleteOrdersMethod = (deleteOrders : RequestHandler) : Method => ({
   type           : "DELETE",
   queryParamKeys : OrdersQueryParamsKeys,
   requestHandler : deleteOrders,
});

const deleteOrderMethod = (deleteOrder : RequestHandler) : Method => ({
   type           : "DELETE",
   paramKeys      : [ ID ],
   requestHandler : deleteOrder,
});

const ID : string = 'id';

export const OrdersQueryParamsKeys : string[] = [
   'clientId',
   'status',
];

export const OrdersController = (service : OrdersService) : Controller => ({
   path   : 'orders/',
   guard  : true,
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
