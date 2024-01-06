import {
   addPageDataToResponse,
   CommandResult,
   Error,
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
import {
   CreateOrderRequest,
   DeleteOrderRequest,
   GetOrderRequest,
   OrdersRequest,
   UpdateOrderRequest,
   UpdateOrdersRequest,
} from "./orders.type";
import { Order } from "./order.type";
import {
   mapOrdersToSuccessResponse,
   mapOrderToSuccessResponse,
   mapRequestToCreateOrderDTO,
   mapRequestToDeleteOrderDTO,
   mapRequestToGetOrderDTO,
   mapRequestToOrdersDTO,
   mapRequestToUpdateOrderDTO,
   mapRequestToUpdateOrdersDTO,
} from "./orders-dtos.utility";
import { OrdersValidator } from "./orders.validator";

export type OrdersService = {
   getOrder : RequestHandler,
   getOrders : RequestHandler,
   createOrder : RequestHandler,
   updateOrder : RequestHandler,
   updateOrders : RequestHandler,
   deleteOrder : RequestHandler,
   deleteOrders : RequestHandler,
};

export const OrdersService = (
   repository: OrdersRepository,
   validator: OrdersValidator,
): OrdersService => ({
   getOrder: async (request: Request): Promise<Response> => {
      const dto: GetOrderRequest = mapRequestToGetOrderDTO(request);
      const validationOutcome: ValidationError | null = await validator.validateGetOrderDto(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: Order | Error = await repository.getOrder(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapOrderToSuccessResponse(result);
   },

   getOrders: async (request: Request): Promise<Response> => {
      const dto: OrdersRequest = mapRequestToOrdersDTO(request);
      const validationOutcome: ValidationError | null = await validator.validateOrdersDto(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: Order[] | Error = await repository.getOrders(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      const response : Response = mapOrdersToSuccessResponse(result);
      if (dto.page !== undefined) return addPageDataToResponse(dto.page, response);
      return response;
   },

   createOrder: async (request: Request): Promise<Response> => {
      const dto: CreateOrderRequest = mapRequestToCreateOrderDTO(request);
      const validationOutcome: ValidationError | null = await validator.validateCreateOrderDto(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: Order | Error = await repository.createOrder(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapOrderToSuccessResponse(result);
   },

   updateOrder: async (request: Request): Promise<Response> => {
      const dto: UpdateOrderRequest = mapRequestToUpdateOrderDTO(request);
      const validationOutcome: ValidationError | null = await validator.validateUpdateOrderDto(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: Order | Error = await repository.updateOrder(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapOrderToSuccessResponse(result);
   },

   updateOrders: async (request: Request): Promise<Response> => {
      const dto: UpdateOrdersRequest = mapRequestToUpdateOrdersDTO(request);
      const validationOutcome: ValidationError | null = await validator.validateUpdateOrdersDto(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: CommandResult | Error = await repository.updateOrders(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapCommandResultToSuccessResponse(result);
   },

   deleteOrder: async (request: Request): Promise<Response> => {
      const dto: DeleteOrderRequest = mapRequestToDeleteOrderDTO(request);
      const validationOutcome: ValidationError | null = await validator.validateDeleteOrderDto(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: CommandResult | Error = await repository.deleteOrder(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapCommandResultToSuccessResponse(result);
   },

   deleteOrders: async (request: Request): Promise<Response> => {
      const dto: OrdersRequest = mapRequestToOrdersDTO(request);
      const validationOutcome: ValidationError | null = await validator.validateOrdersDto(dto);
      if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
      const result: CommandResult | Error = await repository.deleteOrders(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapCommandResultToSuccessResponse(result);
   },
});
