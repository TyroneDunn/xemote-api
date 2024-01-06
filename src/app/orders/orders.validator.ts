import {
   CreateOrderRequest,
   DeleteOrderRequest,
   GetOrderRequest,
   OrdersRequest,
   UpdateOrderRequest,
   UpdateOrdersRequest,
} from "./orders.type";
import { OrdersRepository } from "./orders-repository.type";
import { ValidationError } from "@hals/common";
import { ProductsRepository } from "../products/products-repository.type";

export type OrdersValidator = {
   validateGetOrderRequest: (request: GetOrderRequest) => Promise<ValidationError | null>,
   validateOrdersRequest: (request: OrdersRequest) => Promise<ValidationError | null>,
   validateCreateOrderRequest: (request: CreateOrderRequest) => Promise<ValidationError | null>,
   validateUpdateOrderRequest: (request: UpdateOrderRequest) => Promise<ValidationError | null>,
   validateUpdateOrdersRequest: (request: UpdateOrdersRequest) => Promise<ValidationError | null>,
   validateDeleteOrderRequest: (request: DeleteOrderRequest) => Promise<ValidationError | null>,
};

export const OrdersValidator =
   (
      ordersRepository: OrdersRepository,
      productsRepository: ProductsRepository,
   ): OrdersValidator => ({
      validateGetOrderRequest: async (request: GetOrderRequest): Promise<ValidationError | null> => {
         if (!request._id)
            return { error: { type: "BadRequest", message: 'ID required.' } };
         if (!(await ordersRepository.exists(request)))
            return { error: { type: "NotFound", message: `Order "${request._id}" not found.` } };
         return null;
      },

      validateOrdersRequest: async (request: OrdersRequest): Promise<ValidationError | null> => {
         if (request.filter) {
            if (request.filter.status)
               if (request.filter.status !== "complete"
                  && request.filter.status !== "pending"
                  && request.filter.status !== "cancelled")
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid status. Status must be' +
                           ' "complete", "pending" or "cancelled".',
                     },
                  };
            if (request.filter.countRange) {
               if (request.filter.countRange.start && (request.filter.countRange.start < 0))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid count range. Count range' +
                           ' start value must be greater than 0.',
                     },
                  };
               if (request.filter.countRange.end && (request.filter.countRange.end < 0))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid count range. Count range' +
                           ' end value must be greater than 0.',
                     },
                  };
               if ((request.filter.countRange.start && request.filter.countRange.end)
                  && (request.filter.countRange.end < request.filter.countRange.start))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid count range. Count range' +
                           ' end value must be greater than start value.',
                     },
                  };
            }
         }

         if (request.timestamps) {
            if (request.timestamps.createdAt) {
               if (request.timestamps.createdAt.start && isNaN(Date.parse(request.timestamps.createdAt.start)))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid createdAt start' +
                           ' date. Provide a valid ISO date string.',
                     },
                  };
               if (request.timestamps.createdAt.end && isNaN(Date.parse(request.timestamps.createdAt.end)))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid createdAt end' +
                           ' date. Provide a valid ISO date string.',
                     },
                  };
            }
            if (request.timestamps.updatedAt) {
               if (request.timestamps.updatedAt.start && isNaN(Date.parse(request.timestamps.updatedAt.start)))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid updatedAt start' +
                           ' date. Provide a valid ISO date string.',
                     },
                  };
               if (request.timestamps.updatedAt.end && isNaN(Date.parse(request.timestamps.updatedAt.end)))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid updatedAt end' +
                           ' date. Provide a valid ISO date string.',
                     },
                  };
            }
         }

         if (request.sort) {
            if (request.sort.field && !request.sort.order)
               return {
                  error: {
                     type: "BadRequest",
                     message: 'Invalid sort. Provide sort order.',
                  },
               };
            if (!request.sort.field && request.sort.order)
               return {
                  error: {
                     type: "BadRequest",
                     message: 'Invalid sort. Provide sort field.',
                  },
               };
            if (request.sort.field !== "clientId"
               && request.sort.field !== "status")
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid sort. Sort field must be' +
                        ' "clientId" or "status".',
                  },
               };
            if (request.sort.order !== "asc" && request.sort.order !== "desc")
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid sort. Sort order must be' +
                        ' "asc" or "desc".',
                  },
               };
         }

         if (request.page) {
            if (request.page.index && !request.page.limit)
               return {
                  error: {
                     type: "BadRequest",
                     message: 'Invalid page. Provide page limit.',
                  },
               };
            if (!request.page.index && request.page.limit)
               return {
                  error: {
                     type: "BadRequest",
                     message: 'Invalid page. Provide page index.',
                  },
               };
            if (request.page.index < 0)
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid page. Page index must be' +
                        ' 0 or greater.',
                  },
               };
            if (request.page.limit < 1)
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid page. Page limit must be' +
                        ' 1 or greater.',
                  },
               };
         }

         return null;
      },

      validateCreateOrderRequest: async (request: CreateOrderRequest): Promise<ValidationError | null> => {
         if (!request.clientId)
            return { error: { type: "BadRequest", message: 'Client ID required.' } };
         if (!request.status)
            return { error: { type: "BadRequest", message: 'Status required.' } };
         if (request.status)
            if (request.status !== "complete"
               && request.status !== "pending"
               && request.status !== "cancelled")
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid status. Status must be' +
                        ' "complete", "pending" or "cancelled".',
                  },
               };
         if (!request.cart)
            return { error: { type: "BadRequest", message: 'Cart required.' } };
         for (let product in request.cart) {
            if (!(await productsRepository.exists({ _id: product })))
               return {
                  error: {
                     type: "NotFound",
                     message: `Invalid cart. Product "${product}" does not exist.`,
                  },
               };
            if (request.cart[product] < 1)
               return {
                  error: {
                     type: "BadRequest",
                     message: `Invalid cart. Product ${product} count must be greater than 1.`,
                  },
               };
         }
         return null;
      },

      validateUpdateOrderRequest: async (request: UpdateOrderRequest): Promise<ValidationError | null> => {
         if (!request._id)
            return { error: { type: "BadRequest", message: 'ID required.' } };
         if (!(await ordersRepository.exists(request)))
            return { error: { type: "NotFound", message: `Order "${request._id}" not found.` } };
         if (!request.updateFields)
            return {
               error: {
                  type: "BadRequest", message: 'Invalid request. Update field(s)' +
                     ' required.',
               },
            };
         if (request.updateFields.newStatus)
            if (request.updateFields.newStatus !== "complete"
               && request.updateFields.newStatus !== "pending"
               && request.updateFields.newStatus !== "cancelled")
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid status. Status must be' +
                        ' "complete", "pending" or "cancelled".',
                  },
               };
         if (request.updateFields.newCart) {
            for (const product in request.updateFields.newCart) {
               if (!(await productsRepository.exists({ _id: product })))
                  return {
                     error: {
                        type: "NotFound",
                        message: `Invalid cart. Product "${product}" does not exist.`,
                     },
                  };
               if (request.updateFields.newCart[product] < 1)
                  return {
                     error: {
                        type: "BadRequest",
                        message: `Invalid cart. Product ${product} count must be greater than 1.`,
                     },
                  };
            }
         }
         return null;
      },

      validateUpdateOrdersRequest: async (request: UpdateOrdersRequest): Promise<ValidationError | null> => {
         if (request.filter.status)
            if (request.filter.status !== "complete"
               && request.filter.status !== "pending"
               && request.filter.status !== "cancelled")
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid status. Status must be' +
                        ' "complete", "pending" or "cancelled".',
                  },
               };

         if (request.filter.countRange) {
            if (request.filter.countRange.start && (request.filter.countRange.start < 0))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid count range. Count range' +
                        ' start value must be greater than 0.',
                  },
               };
            if (request.filter.countRange.end && (request.filter.countRange.end < 0))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid count range. Count range' +
                        ' end value must be greater than 0.',
                  },
               };
            if ((request.filter.countRange.start && request.filter.countRange.end)
               && (request.filter.countRange.end < request.filter.countRange.start))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid count range. Count range' +
                        ' end value must be greater than start value.',
                  },
               };
         }

         if (request.timestamps) {
            if (request.timestamps.createdAt) {
               if (request.timestamps.createdAt.start && isNaN(Date.parse(request.timestamps.createdAt.start)))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid createdAt start' +
                           ' date. Provide a valid ISO date string.',
                     },
                  };
               if (request.timestamps.createdAt.end && isNaN(Date.parse(request.timestamps.createdAt.end)))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid createdAt end' +
                           ' date. Provide a valid ISO date string.',
                     },
                  };
            }
            if (request.timestamps.updatedAt) {
               if (request.timestamps.updatedAt.start && isNaN(Date.parse(request.timestamps.updatedAt.start)))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid updatedAt start' +
                           ' date. Provide a valid ISO date string.',
                     },
                  };
               if (request.timestamps.updatedAt.end && isNaN(Date.parse(request.timestamps.updatedAt.end)))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid updatedAt end' +
                           ' date. Provide a valid ISO date string.',
                     },
                  };
            }
         }

         if (!request.updateFields)
            return {
               error: {
                  type: "BadRequest", message: 'Invalid request. Update field(s)' +
                     ' required.',
               },
            };
         if (request.updateFields.newStatus)
            if (request.updateFields.newStatus !== "complete"
               && request.updateFields.newStatus !== "pending"
               && request.updateFields.newStatus !== "cancelled")
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid status. Status must be' +
                        ' "complete", "pending" or "cancelled".',
                  },
               };
         if (request.updateFields.newCart) {
            for (const product in request.updateFields.newCart) {
               if (!(await productsRepository.exists({ _id: product })))
                  return {
                     error: {
                        type: "NotFound",
                        message: `Invalid cart. Product "${product}" does not exist.`,
                     },
                  };
               if (request.updateFields.newCart[product] < 1)
                  return {
                     error: {
                        type: "BadRequest",
                        message: `Invalid cart. Product ${product} count must be greater than 1.`,
                     },
                  };
            }
         }

         return null;
      },

      validateDeleteOrderRequest: async (request: DeleteOrderRequest): Promise<ValidationError | null> => {
         if (!request._id)
            return { error: { type: "BadRequest", message: 'ID required.' } };
         if (!(await ordersRepository.exists(request)))
            return { error: { type: "NotFound", message: `Order "${request._id}" not found.` } };
         return null;
      },
   });
