import {
   CommandResult,
   Error,
   handleRequest,
   isError,
   isValidationError,
   mapCommandResultToSuccessResponse,
   mapErrorToInternalServerErrorResponse,
   mapValidationErrorToErrorResponse,
   Request,
   RequestHandler,
   Response,
   ValidationError,
} from "@hals/common";
import { OrdersRepository } from "./orders-repository.type";
import { OrdersRequest } from "./orders.type";
import {
   createOrderAndMapResultToResponse,
   deleteOrderAndMapResultToResponse,
   getOrderAndMapToResponse,
   getOrdersAndMapResultToResponse,
   mapRequestToCreateOrderRequest,
   mapRequestToDeleteOrderRequest,
   mapRequestToGetOrderRequest,
   mapRequestToOrdersRequest,
   mapRequestToUpdateOrderRequest,
   mapRequestToUpdateOrdersRequest,
   updateOrderAndMapResultToResponse,
   updateOrdersAndMapResultToResponse,
} from "./orders.utility";
import { OrdersValidator } from "./orders.validator";

export type OrdersService = {
   getOrder     : RequestHandler,
   getOrders    : RequestHandler,
   createOrder  : RequestHandler,
   updateOrder  : RequestHandler,
   updateOrders : RequestHandler,
   deleteOrder  : RequestHandler,
   deleteOrders : RequestHandler,
};

export const OrdersService = (
   repository: OrdersRepository,
   validator: OrdersValidator,
): OrdersService => ({
   getOrder: async (request: Request): Promise<Response> => handleRequest(
      mapRequestToGetOrderRequest(request),
      validator.validateGetOrderRequest,
      getOrderAndMapToResponse(repository.getOrder),
   ),

   getOrders: async (request: Request): Promise<Response> => handleRequest(
      mapRequestToOrdersRequest(request),
      validator.validateOrdersRequest,
      getOrdersAndMapResultToResponse(repository.getOrders),
   ),

   createOrder: async (request: Request): Promise<Response> => handleRequest(
      mapRequestToCreateOrderRequest(request),
      validator.validateCreateOrderRequest,
      createOrderAndMapResultToResponse(repository.createOrder),
   ),

   updateOrder: async (request: Request): Promise<Response> => handleRequest(
      mapRequestToUpdateOrderRequest(request),
      validator.validateUpdateOrderRequest,
      updateOrderAndMapResultToResponse(repository.updateOrder),
   ),

   updateOrders: async (request: Request): Promise<Response> => handleRequest(
      mapRequestToUpdateOrdersRequest(request),
      validator.validateUpdateOrdersRequest,
      updateOrdersAndMapResultToResponse(repository.updateOrders),
   ),

   deleteOrder: async (request: Request): Promise<Response> => handleRequest(
      mapRequestToDeleteOrderRequest(request),
      validator.validateDeleteOrderRequest,
      deleteOrderAndMapResultToResponse(repository.deleteOrder),
   ),

   deleteOrders: async (request: Request): Promise<Response> => {
      const dto: OrdersRequest = mapRequestToOrdersRequest(request);
      const validationOutcome: ValidationError | null = await validator.validateOrdersRequest(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: CommandResult | Error = await repository.deleteOrders(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapCommandResultToSuccessResponse(result);
   },
});
