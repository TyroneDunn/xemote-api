import {HttpStatusCodes, Request, Response} from "@hals/core";
import {
    CreateOrderDTO,
    DeleteOrderDTO,
    GetOrderDTO,
    OrdersDTO,
    UpdateOrderDTO,
    UpdateOrdersDTO
} from "./orders-dtos.type";
import {Order, OrderStatus, ProductCount} from "./order.type";

export const mapRequestToGetOrderDTO = (request: Request): GetOrderDTO =>
    ({ _id: request.paramMap['id'] });

export const mapOrderToSuccessResponse = (order: Order): Response => ({
    status: HttpStatusCodes.OK,
    collection: [order],
    count: 1,
});

export const mapOrdersToSuccessResponse = (orders: Order[]): Response => ({
    status: HttpStatusCodes.OK,
    collection: [orders],
    count: orders.length,
});

export const mapRequestToCreateOrderDTO = (request: Request): CreateOrderDTO => ({
    clientId: request.payload['clientId'],
    status: request.payload['status'] as OrderStatus,
    cart: request.payload['cart'] as ProductCount,
});
