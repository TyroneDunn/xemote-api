import {
   addPageDataToResponse,
   CommandResult,
   Error,
   isError,
   mapCommandResultToSuccessResponse,
   mapErrorToInternalServerErrorResponse,
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
   Order,
   OrdersRequest,
   OrdersSortOptions,
   OrderStatus,
   ProductCount,
   UpdateOrderRequest,
   UpdateOrdersRequest,
} from "./orders.type";
import {
   CreateOrder,
   DeleteOrder,
   DeleteOrders,
   GetOrder,
   GetOrders,
   UpdateOrder,
   UpdateOrders,
} from './orders-repository.type';

export const mapRequestToGetOrderRequest = (request : Request) : GetOrderRequest =>
   ({ _id : request.paramMap['id'] });

export const mapOrderToSuccessResponse = (order : Order) : Response => ({
   status     : OK,
   collection : [ order ],
   count      : 1,
});

export const mapRequestToOrdersRequest = (request : Request) : OrdersRequest => ({
   ...mapRequestToOrdersFilter(request),
   ...mapRequestToTimestamps(request),
   ...mapRequestToOrdersSort(request),
   ...mapRequestToPage(request),
});

const mapRequestToOrdersFilter = (request : Request) => ({
   filter : {
      ...request.queryParamMap['clientId'] && { clientId : request.queryParamMap['clientId'] },
      ...request.queryParamMap['productId'] && { productId : request.queryParamMap['productId'] },
      ...request.queryParamMap['status']
      && { status: request.queryParamMap['status'] as OrderStatus },
      ...request.queryParamMap['countRange']
      && { countRange: JSON.parse(request.queryParamMap['countRange']) as NumberRange },
   },
});

const mapRequestToOrdersSort = (request : Request) => ({
   ...(request.queryParamMap['sort'] && request.queryParamMap['order']) && {
      sort : {
         field : request.queryParamMap['sort'] as OrdersSortOptions,
         order : request.queryParamMap['order'] as OrderOption,
      },
   },
});

export const mapOrdersToSuccessResponse = (orders : Order[]) : Response => ({
   status     : OK,
   collection : [ orders ],
   count      : orders.length,
});

export const mapRequestToCreateOrderRequest = (request : Request) : CreateOrderRequest => ({
   clientId : request.payload['clientId'],
   status   : request.payload['status'] as OrderStatus,
   cart     : request.payload['cart'] as ProductCount,
});

export const mapRequestToUpdateOrderRequest = (request : Request) : UpdateOrderRequest => ({
   _id : request.paramMap['id'],
   ...mapRequestToUpdateFields(request),
});

const mapRequestToUpdateFields = (request : Request) => ({
   updateFields : {
      ...request.payload['newStatus'] && { newStatus : request.payload['newStatus'] },
      ...request.payload['newCart'] && { newCart : request.payload['newCart'] as ProductCount },
   },
});

export const mapRequestToUpdateOrdersRequest = (request : Request) : UpdateOrdersRequest => ({
   ...mapRequestToOrdersFilter(request),
   ...mapRequestToTimestamps(request),
   ...mapRequestToOrdersSort(request),
   ...mapRequestToPage(request),
   ...mapRequestToUpdateFields(request),
});

export const mapRequestToDeleteOrderRequest = (request : Request) : DeleteOrderRequest =>
   ({ _id : request.paramMap['id'] });

export const getOrderAndMapToResponse = (getOrder : GetOrder) =>
   async (getOrderRequest : GetOrderRequest) : Promise<Response> => {
      const result : Order | Error = await getOrder(getOrderRequest);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      else return mapOrderToSuccessResponse(result);
   };

export const getOrdersAndMapResultToResponse = (getOrders : GetOrders) =>
   async (ordersRequest : OrdersRequest) : Promise<Response> => {
      const result : Order[] | Error = await getOrders(ordersRequest);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      const response : Response = mapOrdersToSuccessResponse(result);
      if (ordersRequest.page !== undefined) return addPageDataToResponse(ordersRequest.page, response);
      return response;
   };

export const createOrderAndMapResultToResponse = (createOrder : CreateOrder) =>
   async (createOrderRequest : CreateOrderRequest) : Promise<Response> => {
      const result : Order | Error = await createOrder(createOrderRequest);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapOrderToSuccessResponse(result);
   };

export const updateOrderAndMapResultToResponse = (updateOrder : UpdateOrder) =>
   async (updateOrderRequest : UpdateOrderRequest) : Promise<Response> => {
      const result : Order | Error = await updateOrder(updateOrderRequest);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapOrderToSuccessResponse(result);
   };

export const updateOrdersAndMapResultToResponse = (updateOrders : UpdateOrders) =>
   async (updateOrdersRequest : UpdateOrdersRequest) : Promise<Response> => {
      const result : CommandResult | Error = await updateOrders(updateOrdersRequest);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapCommandResultToSuccessResponse(result);
   };

export const deleteOrderAndMapResultToResponse = (deleteOrder : DeleteOrder) =>
   async (deleteOrderRequest : DeleteOrderRequest) : Promise<Response> => {
      const result : CommandResult | Error = await deleteOrder(deleteOrderRequest);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapCommandResultToSuccessResponse(result);
   };

export const deleteOrdersAndMapResultToResponse = (deleteOrders : DeleteOrders) =>
   async (ordersRequest : OrdersRequest) : Promise<Response> => {
      const result : CommandResult | Error = await deleteOrders(ordersRequest);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      return mapCommandResultToSuccessResponse(result);
   };