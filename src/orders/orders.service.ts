import {Request, Response} from "@hals/core";
import {OrdersRepository} from "./orders-repository.type";
import {ValidationOutcome} from "../shared/validation-outcome/validation-outcome.type";
import {mapValidationOutcomeToErrorResponse} from "../shared/validation-outcome/validation-outcome.utility";
import {
    addRequestPageDataToResponse
} from "../shared/hals/hals.utility";
import {
    CreateOrderDTO,
    DeleteOrderDTO,
    GetOrderDTO,
    OrdersDTO,
    UpdateOrderDTO,
    UpdateOrdersDTO
} from "./orders-dtos.type";
import {Order} from "./order.type";
import {mapCommandResultToSuccessResponse} from "../shared/command-result/command-result.utility";
import {CommandResult} from "../shared/command-result/command-result.type";
import {
    mapOrdersToSuccessResponse,
    mapOrderToSuccessResponse,
    mapRequestToOrdersDTO,
    mapRequestToUpdateOrdersDTO,
    mapRequestToCreateOrderDTO,
    mapRequestToDeleteOrderDTO,
    mapRequestToGetOrderDTO,
    mapRequestToUpdateOrderDTO
} from "./orders-dtos.utility";
import {
    validateCreateOrderDTO,
    validateDeleteOrderDTO,
    validateDeleteOrdersDTO,
    validateGetOrderDTO,
    validateGetOrdersDTO,
    validateUpdateOrderDTO,
    validateUpdateOrdersDTO
} from "./orders-dtos-validator.service";
import {mapToInternalServerErrorResponse} from "../shared/errors/errors.utility";

const repository: OrdersRepository = ORDERS_REPOSITORY;

export const getOrder = async (request: Request): Promise<Response> => {
    const dto: GetOrderDTO = mapRequestToGetOrderDTO(request);

    const validationOutcome: ValidationOutcome = await validateGetOrderDTO(dto);
    if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

    try {
        const order: Order = await repository.getOrder(dto);
        return mapOrderToSuccessResponse(order);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const getOrders = async (request: Request): Promise<Response> => {
    const dto: OrdersDTO = mapRequestToOrdersDTO(request);

    const validationOutcome: ValidationOutcome = await validateGetOrdersDTO(dto);
    if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

    try {
        const orders: Order[] = await repository.getOrders(dto);

        const addPageData = (response: Response): Response =>
            addRequestPageDataToResponse(request, response);
        return addPageData(mapOrdersToSuccessResponse(orders));
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const createOrder = async (request: Request): Promise<Response> => {
    const dto: CreateOrderDTO = mapRequestToCreateOrderDTO(request);

    const validationOutcome: ValidationOutcome = await validateCreateOrderDTO(dto);
    if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

    try {
        const order: Order = await repository.createOrder(dto);
        return mapOrderToSuccessResponse(order);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const updateOrder = async (request: Request): Promise<Response> => {
    const dto: UpdateOrderDTO = mapRequestToUpdateOrderDTO(request);

    const validationOutcome: ValidationOutcome = await validateUpdateOrderDTO(dto);
    if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

    try {
        const order: Order = await repository.updateOrder(dto);
        return mapOrderToSuccessResponse(order);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const updateOrders = async (request: Request): Promise<Response> => {
    const dto: UpdateOrdersDTO = mapRequestToUpdateOrdersDTO(request);

    const validationOutcome: ValidationOutcome = await validateUpdateOrdersDTO(dto);
    if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

    try {
        const result: CommandResult = await repository.updateOrders(dto);
        return mapCommandResultToSuccessResponse(result);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const deleteOrder = async (request: Request): Promise<Response> => {
    const dto: DeleteOrderDTO = mapRequestToDeleteOrderDTO(request);

    const validationOutcome: ValidationOutcome = await validateDeleteOrderDTO(dto);
    if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

    try {
        const result: CommandResult = await repository.deleteOrder(dto);
        return mapCommandResultToSuccessResponse(result);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const deleteOrders = async (request: Request): Promise<Response> => {
    const dto: OrdersDTO = mapRequestToOrdersDTO(request);

    const validationOutcome: ValidationOutcome = await validateDeleteOrdersDTO(dto);
    if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

    try {
        const result: CommandResult = await repository.deleteOrders(dto);
        return mapCommandResultToSuccessResponse(result);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};
