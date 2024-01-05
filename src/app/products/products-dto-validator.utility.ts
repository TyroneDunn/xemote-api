import {
   CreateProductDTO,
   DeleteProductDTO,
   GetProductDTO,
   ProductsDTO,
   UpdateProductDTO,
   UpdateProductsDTO,
} from "./products-dtos.type";
import { ProductsRepository } from "./products-repository.type";
import { ValidationOutcome } from "@hals/common";

export type ProductsDtoValidator = {
   validateGetProductDTO: (dto: GetProductDTO) => Promise<ValidationOutcome>,
   validateProductsDTO: (dto: ProductsDTO) => Promise<ValidationOutcome>,
   validateCreateProductDTO: (dto: CreateProductDTO) => Promise<ValidationOutcome>,
   validateUpdateProductDTO: (dto: UpdateProductDTO) => Promise<ValidationOutcome>,
   validateUpdateProductsDTO: (dto: UpdateProductsDTO) => Promise<ValidationOutcome>,
   validateDeleteProductDTO: (dto: DeleteProductDTO) => Promise<ValidationOutcome>,
};

export const ProductsDtoValidator = (repository : ProductsRepository) : ProductsDtoValidator => ({
   validateGetProductDTO: async (dto: GetProductDTO): Promise<ValidationOutcome> => {
      if (!dto._id) return { error: { type: "BadRequest", message: 'ID required.' } };
      if (!(await repository.exists(dto)))
         return { error: { type: "NotFound", message: `Product "${dto._id}" not found.` } };
      return {};
   },

   validateProductsDTO: async (dto: ProductsDTO): Promise<ValidationOutcome> => {
      if (dto.filter) {
         if (dto.filter.name && dto.filter.nameRegex)
            return {
               error: {
                  type: "BadRequest", message: 'Invalid name. Provide either "name"' +
                     ' or "nameRegex".',
               },
            };
         if (dto.filter.type && dto.filter.typeRegex)
            return {
               error: {
                  type: "BadRequest", message: 'Invalid type. Provide either "type"' +
                     ' or "typeRegex".',
               },
            };
         if (dto.filter.type)
            if (dto.filter.type !== "Xemote Gateway"
               && dto.filter.type !== "Xemote Accessory"
               && dto.filter.type !== "Wireless Temperature Sensor"
               && dto.filter.type !== "Wireless Humidity Sensor"
               && dto.filter.type !== "Wireless AC Current Meter"
               && dto.filter.type !== "Wireless Event-Based Sensor"
               && dto.filter.type !== "Wireless Infrared Beam Sensor"
               && dto.filter.type !== "Wireless 4-30mA Sensor")
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid filter type. Type must be "Xemote' +
                        ' Accessory", "Xemote Gateway", "Wireless Temperature Sensor", "Wireless' +
                        ' Humidity Sensor", "Wireless Ac Current Meter", "Wireless Event-Based' +
                        ' Sensor", "Wireless Infrared Beam Sensor", or "Wireless 4-30mA Sensor".',
                  },
               };
         if (dto.filter.costPriceRange) {
            if (dto.filter.costPriceRange.start && (dto.filter.costPriceRange.start < 0))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid cost price range. Cost price range' +
                        ' start value must be greater than 0.',
                  },
               };
            if (dto.filter.costPriceRange.end && (dto.filter.costPriceRange.end < 0))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid cost price range. Cost price range' +
                        ' end value must be greater than 0.',
                  },
               };
            if ((dto.filter.costPriceRange.start && dto.filter.costPriceRange.end)
               && (dto.filter.costPriceRange.end < dto.filter.costPriceRange.start))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid cost price range. Cost' +
                        ' price range' +
                        ' end value must be greater than start value.',
                  },
               };
         }
         if (dto.filter.markupRange) {
            if (dto.filter.markupRange.start && (dto.filter.markupRange.start < 0))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid markup range. Markup range' +
                        ' start value must be greater than 0.',
                  },
               };
            if (dto.filter.markupRange.end && (dto.filter.markupRange.end < 0))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid markup range. Markup range' +
                        ' end value must be greater than 0.',
                  },
               };
            if ((dto.filter.markupRange.start && dto.filter.markupRange.end)
               && (dto.filter.markupRange.end < dto.filter.markupRange.start))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid markup range. Markup range' +
                        ' end value must be greater than start value.',
                  },
               };
         }
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
            return { error: { type: "BadRequest", message: 'Invalid sort. Provide sort order.' } };
         if (!dto.sort.field && dto.sort.order)
            return { error: { type: "BadRequest", message: 'Invalid sort. Provide sort field.' } };
         if (dto.sort.field !== "name"
            && dto.sort.field !== "type"
            && dto.sort.field !== "costPrice"
            && dto.sort.field !== "markup"
            && dto.sort.field !== "createdAt"
            && dto.sort.field !== "updatedAt")
            return {
               error: {
                  type: "BadRequest", message: 'Invalid sort. Sort field must be' +
                     ' "name", "type", "costPrice", "markup", "createdAt", or' +
                     ' "updatedAt".',
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
            return { error: { type: "BadRequest", message: 'Invalid page. Provide page limit.' } };
         if (!dto.page.index && dto.page.limit)
            return { error: { type: "BadRequest", message: 'Invalid page. Provide page index.' } };
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

   validateCreateProductDTO: async (dto: CreateProductDTO): Promise<ValidationOutcome> => {
      if (!dto.name)
         return { error: { type: "BadRequest", message: 'Name required.' } };
      if (!dto.type)
         return { error: { type: "BadRequest", message: 'Type required.' } };
      if (dto.type !== "Xemote Gateway"
         && dto.type !== "Xemote Accessory"
         && dto.type !== "Wireless Temperature Sensor"
         && dto.type !== "Wireless Humidity Sensor"
         && dto.type !== "Wireless AC Current Meter"
         && dto.type !== "Wireless Event-Based Sensor"
         && dto.type !== "Wireless Infrared Beam Sensor"
         && dto.type !== "Wireless 4-30mA Sensor")
         return {
            error: {
               type: "BadRequest", message: 'Invalid type. Type must be "Xemote' +
                  ' Accessory", "Xemote Gateway", "Wireless Temperature Sensor", "Wireless' +
                  ' Humidity Sensor", "Wireless Ac Current Meter", "Wireless Event-Based' +
                  ' Sensor", "Wireless Infrared Beam Sensor", or "Wireless 4-30mA Sensor".',
            },
         };
      if (!dto.name)
         return { error: { type: "BadRequest", message: 'Name required.' } };
      if (!dto.costPrice)
         return { error: { type: "BadRequest", message: 'Cost price required.' } };
      if (!dto.costPrice.price)
         return { error: { type: "BadRequest", message: 'Price required.' } };
      if (dto.costPrice.price < 0)
         return {
            error: {
               type: "BadRequest", message: 'Invalid price. Price must be' +
                  ' greater than 0.',
            },
         };
      if (!dto.costPrice.currency)
         return { error: { type: "BadRequest", message: 'Currency required.' } };
      if (dto.costPrice.currency !== "ZAR"
         && dto.costPrice.currency !== "USD")
         return {
            error: {
               type: "BadRequest", message: 'Invalid currency. Currency must be' +
                  ' "ZAR" or "USD".',
            },
         };
      if (!dto.markup)
         return { error: { type: "BadRequest", message: 'Markup required.' } };
      if (dto.markup < 0)
         return { error: { type: "BadRequest", message: 'Markup must be greater than 0.' } };
      return {};
   },

   validateUpdateProductDTO: async (dto: UpdateProductDTO): Promise<ValidationOutcome> => {
      if (!dto._id)
         return { error: { type: "BadRequest", message: 'ID required.' } };
      if (!(await repository.exists(dto)))
         return { error: { type: "NotFound", message: `Product "${dto._id}" not found.` } };
      if (!dto.updateFields)
         return {
            error: {
               type: "BadRequest", message: 'Invalid request. Update field(s)' +
                  ' required.',
            },
         };
      if (dto.updateFields.newName && dto.updateFields.newName === '')
         return {
            error: {
               type: "BadRequest", message: 'Invalid name. Name cannot be empty' +
                  ' string.',
            },
         };
      if (dto.updateFields.newType)
         if (dto.updateFields.newType !== "Xemote Gateway"
            && dto.updateFields.newType !== "Xemote Accessory"
            && dto.updateFields.newType !== "Wireless Temperature Sensor"
            && dto.updateFields.newType !== "Wireless Humidity Sensor"
            && dto.updateFields.newType !== "Wireless AC Current Meter"
            && dto.updateFields.newType !== "Wireless Event-Based Sensor"
            && dto.updateFields.newType !== "Wireless Infrared Beam Sensor"
            && dto.updateFields.newType !== "Wireless 4-30mA Sensor")
            return {
               error: {
                  type: "BadRequest", message: 'Invalid type. New yype must be "Xemote' +
                     ' Accessory", "Xemote Gateway", "Wireless Temperature Sensor", "Wireless' +
                     ' Humidity Sensor", "Wireless Ac Current Meter", "Wireless Event-Based' +
                     ' Sensor", "Wireless Infrared Beam Sensor", or "Wireless 4-30mA Sensor".',
               },
            };
      if (dto.updateFields.newCostPrice) {
         if (dto.updateFields.newCostPrice.price && dto.updateFields.newCostPrice.price < 0)
            return {
               error: {
                  type: "BadRequest", message: 'Invalid price. Price must be' +
                     ' greater than 0.',
               },
            };
         if (dto.updateFields.newCostPrice.currency)
            if (dto.updateFields.newCostPrice.currency !== "ZAR" &&
               dto.updateFields.newCostPrice.currency !== "USD")
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid currency. Currency' +
                        ' must be "ZAR" or "USD".',
                  },
               };
      }
      if (dto.updateFields.newMarkup && dto.updateFields.newMarkup < 0)
         return {
            error: {
               type: "BadRequest", message: 'Invalid markup. Markup' +
                  ' must be greater than 0.',
            },
         };
      return {};
   },

   validateUpdateProductsDTO: async (dto: UpdateProductsDTO): Promise<ValidationOutcome> => {
      if (dto.filter.name && dto.filter.nameRegex)
         return {
            error: {
               type: "BadRequest", message: 'Invalid name. Provide either "name"' +
                  ' or "nameRegex".',
            },
         };
      if (dto.filter.type && dto.filter.typeRegex)
         return {
            error: {
               type: "BadRequest", message: 'Invalid type. Provide either "type"' +
                  ' or "typeRegex".',
            },
         };
      if (dto.filter.type)
         if (dto.filter.type !== "Xemote Gateway"
            && dto.filter.type !== "Xemote Accessory"
            && dto.filter.type !== "Wireless Temperature Sensor"
            && dto.filter.type !== "Wireless Humidity Sensor"
            && dto.filter.type !== "Wireless AC Current Meter"
            && dto.filter.type !== "Wireless Event-Based Sensor"
            && dto.filter.type !== "Wireless Infrared Beam Sensor"
            && dto.filter.type !== "Wireless 4-30mA Sensor")
            return {
               error: {
                  type: "BadRequest", message: 'Invalid filter type. Type must be "Xemote' +
                     ' Accessory", "Xemote Gateway", "Wireless Temperature Sensor", "Wireless' +
                     ' Humidity Sensor", "Wireless Ac Current Meter", "Wireless Event-Based' +
                     ' Sensor", "Wireless Infrared Beam Sensor", or "Wireless 4-30mA Sensor".',
               },
            };
      if (dto.filter.costPriceRange) {
         if (dto.filter.costPriceRange.start && (dto.filter.costPriceRange.start < 0))
            return {
               error: {
                  type: "BadRequest", message: 'Invalid cost price range. Cost price range' +
                     ' start value must be greater than 0.',
               },
            };
         if (dto.filter.costPriceRange.end && (dto.filter.costPriceRange.end < 0))
            return {
               error: {
                  type: "BadRequest", message: 'Invalid cost price range. Cost price range' +
                     ' end value must be greater than 0.',
               },
            };
         if ((dto.filter.costPriceRange.start && dto.filter.costPriceRange.end)
            && (dto.filter.costPriceRange.end < dto.filter.costPriceRange.start))
            return {
               error: {
                  type: "BadRequest", message: 'Invalid cost price range. Cost' +
                     ' price range' +
                     ' end value must be greater than start value.',
               },
            };
      }
      if (dto.filter.markupRange) {
         if (dto.filter.markupRange.start && (dto.filter.markupRange.start < 0))
            return {
               error: {
                  type: "BadRequest", message: 'Invalid markup range. Markup range' +
                     ' start value must be greater than 0.',
               },
            };
         if (dto.filter.markupRange.end && (dto.filter.markupRange.end < 0))
            return {
               error: {
                  type: "BadRequest", message: 'Invalid markup range. Markup range' +
                     ' end value must be greater than 0.',
               },
            };
         if ((dto.filter.markupRange.start && dto.filter.markupRange.end)
            && (dto.filter.markupRange.end < dto.filter.markupRange.start))
            return {
               error: {
                  type: "BadRequest", message: 'Invalid markup range. Markup range' +
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
               type: "BadRequest", message: 'Invalid request. Update field' +
                  ' required.',
            },
         };
      if (dto.updateFields.newName && dto.updateFields.newName === '')
         return {
            error: {
               type: "BadRequest", message: 'Invalid name. Name cannot be empty' +
                  ' string.',
            },
         };
      if (dto.updateFields.newType)
         if (dto.updateFields.newType !== "Xemote Gateway"
            && dto.updateFields.newType !== "Xemote Accessory"
            && dto.updateFields.newType !== "Wireless Temperature Sensor"
            && dto.updateFields.newType !== "Wireless Humidity Sensor"
            && dto.updateFields.newType !== "Wireless AC Current Meter"
            && dto.updateFields.newType !== "Wireless Event-Based Sensor"
            && dto.updateFields.newType !== "Wireless Infrared Beam Sensor"
            && dto.updateFields.newType !== "Wireless 4-30mA Sensor")
            return {
               error: {
                  type: "BadRequest", message: 'Invalid type. New yype must be "Xemote' +
                     ' Accessory", "Xemote Gateway", "Wireless Temperature Sensor", "Wireless' +
                     ' Humidity Sensor", "Wireless Ac Current Meter", "Wireless Event-Based' +
                     ' Sensor", "Wireless Infrared Beam Sensor", or "Wireless 4-30mA Sensor".',
               },
            };
      if (dto.updateFields.newCostPrice) {
         if (dto.updateFields.newCostPrice.price && dto.updateFields.newCostPrice.price < 0)
            return {
               error: {
                  type: "BadRequest", message: 'Invalid price. Price must be' +
                     ' greater than 0.',
               },
            };
         if (dto.updateFields.newCostPrice.currency)
            if (dto.updateFields.newCostPrice.currency !== "ZAR" &&
               dto.updateFields.newCostPrice.currency !== "USD")
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid currency. Currency' +
                        ' must be "ZAR" or "USD".',
                  },
               };
      }
      if (dto.updateFields.newMarkup && dto.updateFields.newMarkup < 0)
         return {
            error: {
               type: "BadRequest", message: 'Invalid markup. Markup' +
                  ' must be greater than 0.',
            },
         };
      return {};
   },

   validateDeleteProductDTO: async (dto: DeleteProductDTO): Promise<ValidationOutcome> => {
      if (!dto._id)
         return { error: { type: "BadRequest", message: 'ID required.' } };
      if (!(await repository.exists(dto)))
         return { error: { type: "NotFound", message: `Product "${dto._id}" not found.` } };
      return {};
   },
});
