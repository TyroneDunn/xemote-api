import {Request, Response} from "@hals/core";
import {
    CreateOrderDTO,
    DeleteOrderDTO,
    GetOrderDTO,
    OrdersDTO,
    UpdateOrderDTO,
    UpdateOrdersDTO
} from "./orders-dtos.type";
import {Order} from "./order.type";

export const mapToGetOrderDTO = (request: Request): GetOrderDTO =>
    ({ _id: request.paramMap['id'] });
