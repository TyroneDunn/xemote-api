import {
   mapRequestToPage,
   mapRequestToTimestamps,
   NumberRange,
   OK,
   OrderOption,
   Request,
   Response,
} from "@hals/common";
import {
   CreateOrderRequest,
   DeleteOrderRequest,
   GetOrderRequest,
   OrdersRequest,
   OrdersSortOptions,
   UpdateOrderRequest,
   UpdateOrdersRequest,
} from "./orders.type";
import { Order, OrderStatus, ProductCount } from "./order.type";

export const mapRequestToGetOrderDTO = (request: Request): GetOrderRequest =>
   ({ _id: request.paramMap['id'] });

export const mapOrderToSuccessResponse = (order: Order): Response => ({
   status: OK,
   collection: [ order ],
   count: 1,
});

export const mapRequestToOrdersDTO = (request: Request): OrdersRequest => ({
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
   status: OK,
   collection: [ orders ],
   count: orders.length,
});

export const mapRequestToCreateOrderDTO = (request: Request): CreateOrderRequest => ({
   clientId: request.payload['clientId'],
   status: request.payload['status'] as OrderStatus,
   cart: request.payload['cart'] as ProductCount,
});

export const mapRequestToUpdateOrderDTO = (request: Request): UpdateOrderRequest => ({
   _id: request.paramMap['id'],
   ...mapRequestToUpdateFields(request),
});

const mapRequestToUpdateFields = (request: Request) => ({
   updateFields: {
      ...request.payload['newStatus'] && { newStatus: request.payload['newStatus'] },
      ...request.payload['newCart'] && { newCart: request.payload['newCart'] as ProductCount },
   },
});

export const mapRequestToUpdateOrdersDTO = (request: Request): UpdateOrdersRequest => ({
   ...mapRequestToOrdersFilter(request),
   ...mapRequestToTimestamps(request),
   ...mapRequestToOrdersSort(request),
   ...mapRequestToPage(request),
   ...mapRequestToUpdateFields(request),
});

export const mapRequestToDeleteOrderDTO = (request: Request): DeleteOrderRequest =>
   ({ _id: request.paramMap['id'] });
