import {
    CreateOrderDTO,
    DeleteOrderDTO,
    GetOrderDTO,
    OrdersDTO,
    UpdateOrderDTO,
    UpdateOrdersDTO,
} from "./orders-dtos.type";
import { OrdersRepository } from "./orders-repository.type";
import { ValidationOutcome } from "@hals/common";
import { ProductsRepository } from "../products/products-repository.type";

export type OrdersDtosValidator = {
    validateGetOrderDto: (dto: GetOrderDTO) => Promise<ValidationOutcome>,
    validateOrdersDto: (dto: OrdersDTO) => Promise<ValidationOutcome>,
    validateCreateOrderDto: (dto: CreateOrderDTO) => Promise<ValidationOutcome>,
    validateUpdateOrderDto: (dto: UpdateOrderDTO) => Promise<ValidationOutcome>,
    validateUpdateOrdersDto: (dto: UpdateOrdersDTO) => Promise<ValidationOutcome>,
    validateDeleteOrderDto: (dto: DeleteOrderDTO) => Promise<ValidationOutcome>,
};

export const configureOrdersDtosValidator =
   (
      ordersRepository: OrdersRepository,
      productsRepository: ProductsRepository,
   ): OrdersDtosValidator => ({
       validateGetOrderDto: async (dto: GetOrderDTO): Promise<ValidationOutcome> => {
           if (!dto._id)
               return { error: { type: "BadRequest", message: 'ID required.' } };
           if (!(await ordersRepository.exists(dto)))
               return { error: { type: "NotFound", message: `Order "${dto._id}" not found.` } };
           return {};
       },

       validateOrdersDto: async (dto: OrdersDTO): Promise<ValidationOutcome> => {
           if (dto.filter.status)
               if (dto.filter.status !== "complete"
                  && dto.filter.status !== "pending"
                  && dto.filter.status !== "cancelled")
                   return {
                       error: {
                           type: "BadRequest", message: 'Invalid status. Status must be' +
                              ' "complete", "pending" or "cancelled".',
                       },
                   };
           if (dto.filter.countRange) {
               if (dto.filter.countRange.start && (dto.filter.countRange.start < 0))
                   return {
                       error: {
                           type: "BadRequest", message: 'Invalid count range. Count range' +
                              ' start value must be greater than 0.',
                       },
                   };
               if (dto.filter.countRange.end && (dto.filter.countRange.end < 0))
                   return {
                       error: {
                           type: "BadRequest", message: 'Invalid count range. Count range' +
                              ' end value must be greater than 0.',
                       },
                   };
               if ((dto.filter.countRange.start && dto.filter.countRange.end)
                  && (dto.filter.countRange.end < dto.filter.countRange.start))
                   return {
                       error: {
                           type: "BadRequest", message: 'Invalid count range. Count range' +
                              ' end value must be greater than start value.',
                       },
                   };
           }

           if (dto.timestamps) {
               if (dto.timestamps.createdAt) {
                   if (dto.timestamps.createdAt.start && isNaN(Date.parse(dto.timestamps.createdAt.start)))
                       return {
                           error: {
                               type: "BadRequest", message: 'Invalid createdAt start' +
                                  ' date. Provide a valid ISO date string.',
                           },
                       };
                   if (dto.timestamps.createdAt.end && isNaN(Date.parse(dto.timestamps.createdAt.end)))
                       return {
                           error: {
                               type: "BadRequest", message: 'Invalid createdAt end' +
                                  ' date. Provide a valid ISO date string.',
                           },
                       };
               }
               if (dto.timestamps.updatedAt) {
                   if (dto.timestamps.updatedAt.start && isNaN(Date.parse(dto.timestamps.updatedAt.start)))
                       return {
                           error: {
                               type: "BadRequest", message: 'Invalid updatedAt start' +
                                  ' date. Provide a valid ISO date string.',
                           },
                       };
                   if (dto.timestamps.updatedAt.end && isNaN(Date.parse(dto.timestamps.updatedAt.end)))
                       return {
                           error: {
                               type: "BadRequest", message: 'Invalid updatedAt end' +
                                  ' date. Provide a valid ISO date string.',
                           },
                       };
               }
           }

           if (dto.sort) {
               if (dto.sort.field && !dto.sort.order)
                   return {
                       error: {
                           type: "BadRequest",
                           message: 'Invalid sort. Provide sort order.',
                       },
                   };
               if (!dto.sort.field && dto.sort.order)
                   return {
                       error: {
                           type: "BadRequest",
                           message: 'Invalid sort. Provide sort field.',
                       },
                   };
               if (dto.sort.field !== "clientId"
                  && dto.sort.field !== "status")
                   return {
                       error: {
                           type: "BadRequest", message: 'Invalid sort. Sort field must be' +
                              ' "clientId" or "status".',
                       },
                   };
               if (dto.sort.order !== "asc" && dto.sort.order !== "desc")
                   return {
                       error: {
                           type: "BadRequest", message: 'Invalid sort. Sort order must be' +
                              ' "asc" or "desc".',
                       },
                   };
           }

           if (dto.page) {
               if (dto.page.index && !dto.page.limit)
                   return {
                       error: {
                           type: "BadRequest",
                           message: 'Invalid page. Provide page limit.',
                       },
                   };
               if (!dto.page.index && dto.page.limit)
                   return {
                       error: {
                           type: "BadRequest",
                           message: 'Invalid page. Provide page index.',
                       },
                   };
               if (dto.page.index < 0)
                   return {
                       error: {
                           type: "BadRequest", message: 'Invalid page. Page index must be' +
                              ' 0 or greater.',
                       },
                   };
               if (dto.page.limit < 1)
                   return {
                       error: {
                           type: "BadRequest", message: 'Invalid page. Page limit must be' +
                              ' 1 or greater.',
                       },
                   };
           }

           return {};
       },

       validateCreateOrderDto: async (dto: CreateOrderDTO): Promise<ValidationOutcome> => {
           if (!dto.clientId)
               return { error: { type: "BadRequest", message: 'Client ID required.' } };
           if (!dto.status)
               return { error: { type: "BadRequest", message: 'Status required.' } };
           if (dto.status)
               if (dto.status !== "complete"
                  && dto.status !== "pending"
                  && dto.status !== "cancelled")
                   return {
                       error: {
                           type: "BadRequest", message: 'Invalid status. Status must be' +
                              ' "complete", "pending" or "cancelled".',
                       },
                   };
           if (!dto.cart)
               return { error: { type: "BadRequest", message: 'Cart required.' } };
           for (let product in dto.cart) {
               if (!(await productsRepository.exists({ _id: product })))
                   return {
                       error: {
                           type: "NotFound",
                           message: `Invalid cart. Product "${product}" does not exist.`,
                       },
                   };
               if (dto.cart[product] < 1)
                   return {
                       error: {
                           type: "BadRequest",
                           message: `Invalid cart. Product ${product} count must be greater than 1.`,
                       },
                   };
           }
           return {};
       },

       validateUpdateOrderDto: async (dto: UpdateOrderDTO): Promise<ValidationOutcome> => {
           if (!dto._id)
               return { error: { type: "BadRequest", message: 'ID required.' } };
           if (!(await ordersRepository.exists(dto)))
               return { error: { type: "NotFound", message: `Order "${dto._id}" not found.` } };
           if (!dto.updateFields)
               return {
                   error: {
                       type: "BadRequest", message: 'Invalid request. Update field(s)' +
                          ' required.',
                   },
               };
           if (dto.updateFields.newStatus)
               if (dto.updateFields.newStatus !== "complete"
                  && dto.updateFields.newStatus !== "pending"
                  && dto.updateFields.newStatus !== "cancelled")
                   return {
                       error: {
                           type: "BadRequest", message: 'Invalid status. Status must be' +
                              ' "complete", "pending" or "cancelled".',
                       },
                   };
           if (dto.updateFields.newCart) {
               for (const product in dto.updateFields.newCart) {
                   if (!(await productsRepository.exists({ _id: product })))
                       return {
                           error: {
                               type: "NotFound",
                               message: `Invalid cart. Product "${product}" does not exist.`,
                           },
                       };
                   if (dto.updateFields.newCart[product] < 1)
                       return {
                           error: {
                               type: "BadRequest",
                               message: `Invalid cart. Product ${product} count must be greater than 1.`,
                           },
                       };
               }
           }
           return {};
       },

       validateUpdateOrdersDto: async (dto: UpdateOrdersDTO): Promise<ValidationOutcome> => {
           if (dto.filter.status)
               if (dto.filter.status !== "complete"
                  && dto.filter.status !== "pending"
                  && dto.filter.status !== "cancelled")
                   return {
                       error: {
                           type: "BadRequest", message: 'Invalid status. Status must be' +
                              ' "complete", "pending" or "cancelled".',
                       },
                   };

           if (dto.filter.countRange) {
               if (dto.filter.countRange.start && (dto.filter.countRange.start < 0))
                   return {
                       error: {
                           type: "BadRequest", message: 'Invalid count range. Count range' +
                              ' start value must be greater than 0.',
                       },
                   };
               if (dto.filter.countRange.end && (dto.filter.countRange.end < 0))
                   return {
                       error: {
                           type: "BadRequest", message: 'Invalid count range. Count range' +
                              ' end value must be greater than 0.',
                       },
                   };
               if ((dto.filter.countRange.start && dto.filter.countRange.end)
                  && (dto.filter.countRange.end < dto.filter.countRange.start))
                   return {
                       error: {
                           type: "BadRequest", message: 'Invalid count range. Count range' +
                              ' end value must be greater than start value.',
                       },
                   };
           }

           if (dto.timestamps) {
               if (dto.timestamps.createdAt) {
                   if (dto.timestamps.createdAt.start && isNaN(Date.parse(dto.timestamps.createdAt.start)))
                       return {
                           error: {
                               type: "BadRequest", message: 'Invalid createdAt start' +
                                  ' date. Provide a valid ISO date string.',
                           },
                       };
                   if (dto.timestamps.createdAt.end && isNaN(Date.parse(dto.timestamps.createdAt.end)))
                       return {
                           error: {
                               type: "BadRequest", message: 'Invalid createdAt end' +
                                  ' date. Provide a valid ISO date string.',
                           },
                       };
               }
               if (dto.timestamps.updatedAt) {
                   if (dto.timestamps.updatedAt.start && isNaN(Date.parse(dto.timestamps.updatedAt.start)))
                       return {
                           error: {
                               type: "BadRequest", message: 'Invalid updatedAt start' +
                                  ' date. Provide a valid ISO date string.',
                           },
                       };
                   if (dto.timestamps.updatedAt.end && isNaN(Date.parse(dto.timestamps.updatedAt.end)))
                       return {
                           error: {
                               type: "BadRequest", message: 'Invalid updatedAt end' +
                                  ' date. Provide a valid ISO date string.',
                           },
                       };
               }
           }

           if (!dto.updateFields)
               return {
                   error: {
                       type: "BadRequest", message: 'Invalid request. Update field(s)' +
                          ' required.',
                   },
               };
           if (dto.updateFields.newStatus)
               if (dto.updateFields.newStatus !== "complete"
                  && dto.updateFields.newStatus !== "pending"
                  && dto.updateFields.newStatus !== "cancelled")
                   return {
                       error: {
                           type: "BadRequest", message: 'Invalid status. Status must be' +
                              ' "complete", "pending" or "cancelled".',
                       },
                   };
           if (dto.updateFields.newCart) {
               for (const product in dto.updateFields.newCart) {
                   if (!(await productsRepository.exists({ _id: product })))
                       return {
                           error: {
                               type: "NotFound",
                               message: `Invalid cart. Product "${product}" does not exist.`,
                           },
                       };
                   if (dto.updateFields.newCart[product] < 1)
                       return {
                           error: {
                               type: "BadRequest",
                               message: `Invalid cart. Product ${product} count must be greater than 1.`,
                           },
                       };
               }
           }

           return {};
       },

       validateDeleteOrderDto: async (dto: DeleteOrderDTO): Promise<ValidationOutcome> => {
           if (!dto._id)
               return { error: { type: "BadRequest", message: 'ID required.' } };
           if (!(await ordersRepository.exists(dto)))
               return { error: { type: "NotFound", message: `Order "${dto._id}" not found.` } };
           return {};
       },
   });
