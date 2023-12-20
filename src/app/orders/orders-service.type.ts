import { RequestHandler } from "@hals/common";

export type OrdersService = {
   getOrder: RequestHandler,
   getOrders: RequestHandler,
   createOrder: RequestHandler,
   updateOrder: RequestHandler,
   updateOrders: RequestHandler,
   deleteOrder: RequestHandler,
   deleteOrders: RequestHandler,
};
