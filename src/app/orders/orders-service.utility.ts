import {
   addRequestPageDataToResponse,
   CommandResult,
   Error,
   isError,
   mapCommandResultToSuccessResponse,
   mapErrorToInternalServerErrorResponse,
   mapValidationOutcomeToErrorResponse,
   Request,
   Response,
   ValidationOutcome,
} from "@hals/common";
import { OrdersRepository } from "./orders-repository.type";
import {
   CreateOrderDTO,
   DeleteOrderDTO,
   GetOrderDTO,
   OrdersDTO,
   UpdateOrderDTO,
   UpdateOrdersDTO,
} from "./orders-dtos.type";
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
import { OrdersDtosValidator } from "./orders-dtos-validator.utility";
import { OrdersService } from "./orders-service.type";

export const configureOrdersService = (
   repository: OrdersRepository,
   validator: OrdersDtosValidator,
): OrdersService => ({
   getOrder: async (request: Request): Promise<Response> => {
      const dto: GetOrderDTO = mapRequestToGetOrderDTO(request);
      const validationOutcome: ValidationOutcome = await validator.validateGetOrderDto(dto);
      if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);
      const result: Order | Error = await repository.getOrder(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapOrderToSuccessResponse(result);
   },

   getOrders: async (request: Request): Promise<Response> => {
      const dto: OrdersDTO = mapRequestToOrdersDTO(request);
      const validationOutcome: ValidationOutcome = await validator.validateOrdersDto(dto);
      if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);
      const result: Order[] | Error = await repository.getOrders(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      const addPageData = (response: Response): Response =>
         addRequestPageDataToResponse(request, response);
      return addPageData(mapOrdersToSuccessResponse(result));
   },

   createOrder: async (request: Request): Promise<Response> => {
      const dto: CreateOrderDTO = mapRequestToCreateOrderDTO(request);
      const validationOutcome: ValidationOutcome = await validator.validateCreateOrderDto(dto);
      if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);
      const result: Order | Error = await repository.createOrder(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapOrderToSuccessResponse(result);
   },

   updateOrder: async (request: Request): Promise<Response> => {
      const dto: UpdateOrderDTO = mapRequestToUpdateOrderDTO(request);
      const validationOutcome: ValidationOutcome = await validator.validateUpdateOrderDto(dto);
      if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);
      const result: Order | Error = await repository.updateOrder(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapOrderToSuccessResponse(result);
   },

   updateOrders: async (request: Request): Promise<Response> => {
      const dto: UpdateOrdersDTO = mapRequestToUpdateOrdersDTO(request);
      const validationOutcome: ValidationOutcome = await validator.validateUpdateOrdersDto(dto);
      if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);
      const result: CommandResult | Error = await repository.updateOrders(dto);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapCommandResultToSuccessResponse(result);
   },

   deleteOrder: async (request: Request): Promise<Response> => {
      const dto: DeleteOrderDTO = mapRequestToDeleteOrderDTO(request);

      const validationOutcome: ValidationOutcome = await validator.validateDeleteOrderDto(dto);
      if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

      try {
         const result: CommandResult = await repository.deleteOrder(dto);
         return mapCommandResultToSuccessResponse(result);
      }
      catch (error) {
         return mapErrorToInternalServerErrorResponse(error);
      }
   },

   deleteOrders: async (request: Request): Promise<Response> => {
      const dto: OrdersDTO = mapRequestToOrdersDTO(request);

      const validationOutcome: ValidationOutcome = await validator.validateOrdersDto(dto);
      if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

      try {
         const result: CommandResult = await repository.deleteOrders(dto);
         return mapCommandResultToSuccessResponse(result);
      }
      catch (error) {
         return mapErrorToInternalServerErrorResponse(error);
      }
   },
});
