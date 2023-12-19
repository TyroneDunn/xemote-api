import { HttpStatusCodes, Request, Response } from "@hals/core";
import {
   CreateOrderDTO,
   DeleteOrderDTO,
   GetOrderDTO,
   OrdersDTO,
   OrdersSortOptions,
   UpdateOrderDTO,
   UpdateOrdersDTO,
} from "./orders-dtos.type";
import { Order, OrderStatus, ProductCount } from "./order.type";
import { mapRequestToPage, mapRequestToTimestamps, NumberRange, OrderOption } from "@hals/common";

export const mapRequestToGetOrderDTO = (request: Request): GetOrderDTO =>
   ({ _id: request.paramMap['id'] });

export const mapOrderToSuccessResponse = (order: Order): Response => ({
   status: HttpStatusCodes.OK,
   collection: [ order ],
   count: 1,
});

export const mapRequestToOrdersDTO = (request: Request): OrdersDTO => ({
   ...mapRequestToOrdersFilter(request),
   ...mapRequestToTimestamps(request),
   ...mapRequestToOrdersSort(request),
   ...mapRequestToPage(request),
});

const mapRequestToOrdersFilter = (request: Request) => ({
   filter: {
      ...request.queryParamMap['clientId'] && { clientId: request.queryParamMap['clientId'] },
      ...request.queryParamMap['productId'] && { productId: request.queryParamMap['productId'] },
      ...request.queryParamMap['status']
      && { status: request.queryParamMap['status'] as OrderStatus },
      ...request.queryParamMap['countRange']
      && { countRange: JSON.parse(request.queryParamMap['countRange']) as NumberRange },
   },
});

const mapRequestToOrdersSort = (request: Request) => ({
   ...(request.queryParamMap['sort'] && request.queryParamMap['order']) && {
      sort: {
         field: request.queryParamMap['sort'] as OrdersSortOptions,
         order: request.queryParamMap['order'] as OrderOption,
      },
   },
});

export const mapOrdersToSuccessResponse = (orders: Order[]): Response => ({
   status: HttpStatusCodes.OK,
   collection: [ orders ],
   count: orders.length,
});

export const mapRequestToCreateOrderDTO = (request: Request): CreateOrderDTO => ({
   clientId: request.payload['clientId'],
   status: request.payload['status'] as OrderStatus,
   cart: request.payload['cart'] as ProductCount,
});

export const mapRequestToUpdateOrderDTO = (request: Request): UpdateOrderDTO => ({
   _id: request.paramMap['id'],
   ...mapRequestToUpdateFields(request),
});

const mapRequestToUpdateFields = (request: Request) => ({
   updateFields: {
      ...request.payload['newStatus'] && { newStatus: request.payload['newStatus'] },
      ...request.payload['newCart'] && { newCart: request.payload['newCart'] as ProductCount },
   },
});

export const mapRequestToUpdateOrdersDTO = (request: Request): UpdateOrdersDTO => ({
   ...mapRequestToOrdersFilter(request),
   ...mapRequestToTimestamps(request),
   ...mapRequestToOrdersSort(request),
   ...mapRequestToPage(request),
   ...mapRequestToUpdateFields(request),
});

export const mapRequestToDeleteOrderDTO = (request: Request): DeleteOrderDTO =>
   ({ _id: request.paramMap['id'] });
