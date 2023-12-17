import {Request, Response} from "@hals/core";
import {OrdersRepository} from "./orders-repository.type";
import {
    CreateOrderDTO,
    DeleteOrderDTO,
    GetOrderDTO,
    OrdersDTO,
    UpdateOrderDTO,
    UpdateOrdersDTO
} from "./orders-dtos.type";
import {Order} from "./order.type";
import {
    mapOrdersToSuccessResponse,
    mapOrderToSuccessResponse,
    mapRequestToCreateOrderDTO,
    mapRequestToDeleteOrderDTO,
    mapRequestToGetOrderDTO,
    mapRequestToOrdersDTO,
    mapRequestToUpdateOrderDTO,
    mapRequestToUpdateOrdersDTO
} from "./orders-dtos.utility";
import {OrdersDtosValidator,} from "./orders-dtos-validator.utility";
import {OrdersService} from "./orders-service.type";
import {
    addRequestPageDataToResponse, CommandResult, mapCommandResultToSuccessResponse,
    mapErrorToInternalServerErrorResponse,
    mapValidationOutcomeToErrorResponse,
    ValidationOutcome
} from "@hals/common";

export const configureOrdersService = (
    repository: OrdersRepository,
    validator: OrdersDtosValidator
): OrdersService => ({
    getOrder: async (request: Request): Promise<Response> => {
        const dto: GetOrderDTO = mapRequestToGetOrderDTO(request);

        const validationOutcome: ValidationOutcome = await validator.validateGetOrderDto(dto);
        if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

        try {
            const order: Order = await repository.getOrder(dto);
            return mapOrderToSuccessResponse(order);
        } catch (error) {
            return mapErrorToInternalServerErrorResponse(error);
        }
    },

    getOrders: async (request: Request): Promise<Response> => {
        const dto: OrdersDTO = mapRequestToOrdersDTO(request);

        const validationOutcome: ValidationOutcome = await validator.validateOrdersDto(dto);
        if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

        try {
            const orders: Order[] = await repository.getOrders(dto);

            const addPageData = (response: Response): Response =>
                addRequestPageDataToResponse(request, response);
            return addPageData(mapOrdersToSuccessResponse(orders));
        } catch (error) {
            return mapErrorToInternalServerErrorResponse(error);
        }
    },

    createOrder: async (request: Request): Promise<Response> => {
        const dto: CreateOrderDTO = mapRequestToCreateOrderDTO(request);

        const validationOutcome: ValidationOutcome = await validator.validateCreateOrderDto(dto);
        if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

        try {
            const order: Order = await repository.createOrder(dto);
            return mapOrderToSuccessResponse(order);
        } catch (error) {
            return mapErrorToInternalServerErrorResponse(error);
        }
    },

    updateOrder: async (request: Request): Promise<Response> => {
        const dto: UpdateOrderDTO = mapRequestToUpdateOrderDTO(request);

        const validationOutcome: ValidationOutcome = await validator.validateUpdateOrderDto(dto);
        if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

        try {
            const order: Order = await repository.updateOrder(dto);
            return mapOrderToSuccessResponse(order);
        } catch (error) {
            return mapErrorToInternalServerErrorResponse(error);
        }
    },

    updateOrders: async (request: Request): Promise<Response> => {
        const dto: UpdateOrdersDTO = mapRequestToUpdateOrdersDTO(request);

        const validationOutcome: ValidationOutcome = await validator.validateUpdateOrdersDto(dto);
        if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

        try {
            const result: CommandResult = await repository.updateOrders(dto);
            return mapCommandResultToSuccessResponse(result);
        } catch (error) {
            return mapErrorToInternalServerErrorResponse(error);
        }
    },

    deleteOrder: async (request: Request): Promise<Response> => {
        const dto: DeleteOrderDTO = mapRequestToDeleteOrderDTO(request);

        const validationOutcome: ValidationOutcome = await validator.validateDeleteOrderDto(dto);
        if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

        try {
            const result: CommandResult = await repository.deleteOrder(dto);
            return mapCommandResultToSuccessResponse(result);
        } catch (error) {
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
        } catch (error) {
            return mapErrorToInternalServerErrorResponse(error);
        }
    },
});
