import {Request, Response} from "@hals/core";
import {OrdersRepository} from "./orders-repository.type";
import {ORDERS_REPOSITORY} from "../environment/repositories-config";
import {ValidationOutcome} from "../shared/validation-dtos.type";
import {mapToErrorResponse} from "../shared/validation-dtos.utility";
import {
    addRequestPageDataToResponse,
    mapToInternalServerErrorResponse
} from "../shared/hals.utility";
import {
    CreateOrderDTO,
    DeleteOrderDTO,
    GetOrderDTO,
    OrdersDTO,
    UpdateOrderDTO,
    UpdateOrdersDTO
} from "./orders-dtos.type";
import {Order} from "./order.type";
import {mapResultToSuccessResponse} from "../shared/result.utility";
import {Result} from "../shared/result.type";
import {
    mapOrdersToSuccessResponse,
    mapOrderToSuccessResponse,
    mapRequestToOrdersDTO,
    mapRequestToUpdateOrdersDTO,
    mapToCreateOrderDTO,
    mapToDeleteOrderDTO,
    mapToDeleteOrdersDTO,
    mapToGetOrderDTO,
    mapToUpdateOrderDTO
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

const repository: OrdersRepository = ORDERS_REPOSITORY;

export const getOrder = async (request: Request): Promise<Response> => {
    const dto: GetOrderDTO = mapToGetOrderDTO(request);

    const validationOutcome: ValidationOutcome = await validateGetOrderDTO(dto);
    if (validationOutcome.error !== undefined) return mapToErrorResponse(validationOutcome);

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
    if (validationOutcome.error !== undefined) return mapToErrorResponse(validationOutcome);

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
    const dto: CreateOrderDTO = mapToCreateOrderDTO(request);

    const validationOutcome: ValidationOutcome = await validateCreateOrderDTO(dto);
    if (validationOutcome.error !== undefined) return mapToErrorResponse(validationOutcome);

    try {
        const order: Order = await repository.createOrder(dto);
        return mapOrderToSuccessResponse(order);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const updateOrder = async (request: Request): Promise<Response> => {
    const dto: UpdateOrderDTO = mapToUpdateOrderDTO(request);

    const validationOutcome: ValidationOutcome = await validateUpdateOrderDTO(dto);
    if (validationOutcome.error !== undefined) return mapToErrorResponse(validationOutcome);

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
    if (validationOutcome.error !== undefined) return mapToErrorResponse(validationOutcome);

    try {
        const result: Result = await repository.updateOrders(dto);
        return mapResultToSuccessResponse(result);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const deleteOrder = async (request: Request): Promise<Response> => {
    const dto: DeleteOrderDTO = mapToDeleteOrderDTO(request);

    const validationOutcome: ValidationOutcome = await validateDeleteOrderDTO(dto);
    if (validationOutcome.error !== undefined) return mapToErrorResponse(validationOutcome);

    try {
        const result: Result = await repository.deleteOrder(dto);
        return mapResultToSuccessResponse(result);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const deleteOrders = async (request: Request): Promise<Response> => {
    const dto: OrdersDTO = mapToDeleteOrdersDTO(request);

    const validationOutcome: ValidationOutcome = await validateDeleteOrdersDTO(dto);
    if (validationOutcome.error !== undefined) return mapToErrorResponse(validationOutcome);

    try {
        const result: Result = await repository.deleteOrders(dto);
        return mapResultToSuccessResponse(result);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};
