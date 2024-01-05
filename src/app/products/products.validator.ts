import {
   CreateProductRequest,
   DeleteProductRequest,
   GetProductRequest,
   ProductsRequest,
   UpdateProductRequest,
   UpdateProductsRequest,
} from "./products.type";
import { ProductsRepository } from "./products-repository.type";
import { ValidationError } from "@hals/common";

export type ProductsValidator = {
   validateGetProductDTO : (dto : GetProductRequest) => Promise<ValidationError | null>,
   validateProductsDTO : (dto : ProductsRequest) => Promise<ValidationError | null>,
   validateCreateProductDTO : (dto : CreateProductRequest) => Promise<ValidationError | null>,
   validateUpdateProductDTO : (dto : UpdateProductRequest) => Promise<ValidationError | null>,
   validateUpdateProductsDTO : (dto : UpdateProductsRequest) => Promise<ValidationError | null>,
   validateDeleteProductDTO : (dto : DeleteProductRequest) => Promise<ValidationError | null>,
};

export const ProductsValidator = (repository : ProductsRepository) : ProductsValidator => ({
   validateGetProductDTO: async (dto : GetProductRequest) : Promise<ValidationError | null> => {
      if (!dto._id) return ValidationError("BadRequest", 'ID required.');
      if (!(await repository.exists(dto)))
         return ValidationError("NotFound", `Product "${dto._id}" not found.`);
      return null;
   },

   validateProductsDTO: async (dto : ProductsRequest) : Promise<ValidationError | null> => {
      if (dto.filter) {
         if (dto.filter.name && dto.filter.nameRegex) return ValidationError(
            "BadRequest",
            'Invalid name. Provide either "name" or "nameRegex".',
         );
         if (dto.filter.category && dto.filter.categoryRegex) return ValidationError(
            "BadRequest",
            'Invalid category. Provide either "category" or "categoryRegex".',
         );
         if (dto.filter.category)
            if (dto.filter.category !== "Xemote Gateway"
               && dto.filter.category !== "Xemote Accessory"
               && dto.filter.category !== "Wireless Temperature Sensor"
               && dto.filter.category !== "Wireless Humidity Sensor"
               && dto.filter.category !== "Wireless AC Current Meter"
               && dto.filter.category !== "Wireless Event-Based Sensor"
               && dto.filter.category !== "Wireless Infrared Beam Sensor"
               && dto.filter.category !== "Wireless 4-30mA Sensor")
               return ValidationError(
                  "BadRequest",
                  'Invalid filter category. Type must be "Xemote' +
                  ' Accessory", "Xemote Gateway", "Wireless Temperature Sensor", "Wireless' +
                  ' Humidity Sensor", "Wireless Ac Current Meter", "Wireless Event-Based' +
                  ' Sensor", "Wireless Infrared Beam Sensor", or "Wireless 4-30mA Sensor".',
               );
         if (dto.filter.costPriceRange) {
            if (dto.filter.costPriceRange.start && (dto.filter.costPriceRange.start < 0))
               return ValidationError(
                  "BadRequest",
                  'Invalid cost price range. Cost price range' +
                  ' start value must be greater than 0.',
               );
            if (dto.filter.costPriceRange.end && (dto.filter.costPriceRange.end < 0))
               return ValidationError(
                  "BadRequest",
                  'Invalid cost price range. Cost price range' +
                  ' end value must be greater than 0.',
               );
            if ((dto.filter.costPriceRange.start && dto.filter.costPriceRange.end)
               && (dto.filter.costPriceRange.end < dto.filter.costPriceRange.start))
               return ValidationError(
                  "BadRequest",
                  'Invalid cost price range. Cost price range end value must be greater ' +
                  'than start value.',
               );
         }
         if (dto.filter.markupRange) {
            if (dto.filter.markupRange.start && (dto.filter.markupRange.start < 0))
               return ValidationError(
                 "BadRequest",
                  'Invalid markup range. Markup range' +
                  ' start value must be greater than 0.'
               );
            if (dto.filter.markupRange.end && (dto.filter.markupRange.end < 0))
               return ValidationError(
                  "BadRequest",
                  'Invalid markup range. Markup range' +
                  ' end value must be greater than 0.'
               );
            if ((dto.filter.markupRange.start && dto.filter.markupRange.end)
               && (dto.filter.markupRange.end < dto.filter.markupRange.start))
               return ValidationError(
                 "BadRequest",
                  'Invalid markup range. Markup range' +
                  ' end value must be greater than start value.'
               );
         }
      }

      if (dto.timestamps) {
         if (dto.timestamps.createdAt) {
            if (dto.timestamps.createdAt.start && isNaN(Date.parse(dto.timestamps.createdAt.start)))
               return ValidationError(
                  "BadRequest",
                  'Invalid createdAt start' +
                  ' date. Provide a valid ISO date string.'
               );
            if (dto.timestamps.createdAt.end && isNaN(Date.parse(dto.timestamps.createdAt.end)))
               return ValidationError(
                  "BadRequest",
                  'Invalid createdAt end' +
                  ' date. Provide a valid ISO date string.'
               );
         }
         if (dto.timestamps.updatedAt) {
            if (dto.timestamps.updatedAt.start && isNaN(Date.parse(dto.timestamps.updatedAt.start)))
               return ValidationError(
                 "BadRequest",
                  'Invalid updatedAt start' +
                  ' date. Provide a valid ISO date string.'
               );
            if (dto.timestamps.updatedAt.end && isNaN(Date.parse(dto.timestamps.updatedAt.end)))
               return ValidationError(
                  "BadRequest",
                  'Invalid updatedAt end' +
                  ' date. Provide a valid ISO date string.'
               );
         }
      }

      if (dto.sort) {
         if (dto.sort.field && !dto.sort.order)
            return ValidationError("BadRequest", 'Invalid sort. Provide sort order.');
         if (!dto.sort.field && dto.sort.order)
            return ValidationError("BadRequest", 'Invalid sort. Provide sort field.');
         if (dto.sort.field !== "name"
            && dto.sort.field !== "category"
            && dto.sort.field !== "costPrice"
            && dto.sort.field !== "markup"
            && dto.sort.field !== "createdAt"
            && dto.sort.field !== "updatedAt")
            return ValidationError(
               "BadRequest",
               'Invalid sort. Sort field must be' +
               ' "name", "category", "costPrice", "markup", "createdAt", or' +
               ' "updatedAt".'
            );
         if (dto.sort.order !== "asc" && dto.sort.order !== "desc")
            return ValidationError("BadRequest", 'Invalid sort. Sort order must be' +
               ' "asc" or "desc".');
      }

      if (dto.page) {
         if (dto.page.index && !dto.page.limit)
            return ValidationError("BadRequest", 'Invalid page. Provide page limit.');
         if (!dto.page.index && dto.page.limit)
            return ValidationError("BadRequest", 'Invalid page. Provide page index.');
         if (dto.page.index < 0)
            return ValidationError(
               "BadRequest",
               'Invalid page. Page index must be 0 or greater.'
            );
         if (dto.page.limit < 1)
            return ValidationError(
               "BadRequest",
               'Invalid page. Page limit must be' +
               ' 1 or greater.'
            );
      }

      return null;
   },

   validateCreateProductDTO: async (dto : CreateProductRequest) : Promise<ValidationError | null> => {
      if (!dto.name)
         return ValidationError("BadRequest", 'Name required.');
      if (!dto.category)
         return ValidationError("BadRequest", 'Type required.');
      if (dto.category !== "Xemote Gateway"
         && dto.category !== "Xemote Accessory"
         && dto.category !== "Wireless Temperature Sensor"
         && dto.category !== "Wireless Humidity Sensor"
         && dto.category !== "Wireless AC Current Meter"
         && dto.category !== "Wireless Event-Based Sensor"
         && dto.category !== "Wireless Infrared Beam Sensor"
         && dto.category !== "Wireless 4-30mA Sensor")
         return ValidationError(
            "BadRequest",
            'Invalid category. Category must be "Xemote' +
            ' Accessory", "Xemote Gateway", "Wireless Temperature Sensor", "Wireless' +
            ' Humidity Sensor", "Wireless Ac Current Meter", "Wireless Event-Based' +
            ' Sensor", "Wireless Infrared Beam Sensor", or "Wireless 4-30mA Sensor".'
         );
      if (!dto.name)
         return ValidationError("BadRequest", 'Name required.');
      if (!dto.costPrice)
         return ValidationError("BadRequest", 'Cost price required.');
      if (!dto.costPrice.price)
         return ValidationError("BadRequest", 'Price required.');
      if (dto.costPrice.price < 0)
         return ValidationError(
            "BadRequest",
            'Invalid price. Price must be' +
            ' greater than 0.'
         );
      if (!dto.costPrice.currency)
         return ValidationError("BadRequest", 'Currency required.');
      if (dto.costPrice.currency !== "ZAR"
         && dto.costPrice.currency !== "USD")
         return ValidationError(
            "BadRequest",
            'Invalid currency. Currency must be' +
            ' "ZAR" or "USD".'
         );
      if (!dto.markup)
         return ValidationError("BadRequest", 'Markup required.');
      if (dto.markup < 0)
         return ValidationError("BadRequest", 'Markup must be greater than 0.');
      return null;
   },

   validateUpdateProductDTO: async (dto : UpdateProductRequest) : Promise<ValidationError | null> => {
      if (!dto._id)
         return ValidationError("BadRequest", 'ID required.');
      if (!(await repository.exists(dto)))
         return ValidationError("NotFound",`Product "${dto._id}" not found.`);
      if (!dto.updateFields)
         return ValidationError(
            "BadRequest",
            'Invalid request. Update field(s)' +
            ' required.'
         );
      if (dto.updateFields.newName && dto.updateFields.newName === '')
         return ValidationError(
            "BadRequest",
            'Invalid name. Name cannot be empty' +
            ' string.'
         );
      if (dto.updateFields.newCategory)
         if (dto.updateFields.newCategory !== "Xemote Gateway"
            && dto.updateFields.newCategory !== "Xemote Accessory"
            && dto.updateFields.newCategory !== "Wireless Temperature Sensor"
            && dto.updateFields.newCategory !== "Wireless Humidity Sensor"
            && dto.updateFields.newCategory !== "Wireless AC Current Meter"
            && dto.updateFields.newCategory !== "Wireless Event-Based Sensor"
            && dto.updateFields.newCategory !== "Wireless Infrared Beam Sensor"
            && dto.updateFields.newCategory !== "Wireless 4-30mA Sensor")
            return ValidationError(
               "BadRequest",
               'Invalid category. New category must be "Xemote' +
               ' Accessory", "Xemote Gateway", "Wireless Temperature Sensor", "Wireless' +
               ' Humidity Sensor", "Wireless Ac Current Meter", "Wireless Event-Based' +
               ' Sensor", "Wireless Infrared Beam Sensor", or "Wireless 4-30mA Sensor".'
            );
      if (dto.updateFields.newCostPrice) {
         if (dto.updateFields.newCostPrice.price && dto.updateFields.newCostPrice.price < 0)
            return ValidationError(
               "BadRequest",
               'Invalid price. Price must be'
            );
         if (dto.updateFields.newCostPrice.currency)
            if (dto.updateFields.newCostPrice.currency !== "ZAR" &&
               dto.updateFields.newCostPrice.currency !== "USD")
               return ValidationError(
                  "BadRequest",
                  'Invalid currency. Currency' +
                  ' must be "ZAR" or "USD".'
               );
      }
      if (dto.updateFields.newMarkup && dto.updateFields.newMarkup < 0)
         return ValidationError(
            "BadRequest",
            'Invalid markup. Markup' +
            ' must be greater than 0.'
         );
      return null;
   },

   validateUpdateProductsDTO: async (dto : UpdateProductsRequest) : Promise<ValidationError | null> => {
      if (dto.filter.name && dto.filter.nameRegex)
         return ValidationError(
            "BadRequest",
            'Invalid name. Provide either "name"' +
            ' or "nameRegex".'
         );
      if (dto.filter.category && dto.filter.categoryRegex)
         return ValidationError(
            "BadRequest",
            'Invalid category. Provide either "category"' +
            ' or "categoryRegex".'
         );
      if (dto.filter.category)
         if (dto.filter.category !== "Xemote Gateway"
            && dto.filter.category !== "Xemote Accessory"
            && dto.filter.category !== "Wireless Temperature Sensor"
            && dto.filter.category !== "Wireless Humidity Sensor"
            && dto.filter.category !== "Wireless AC Current Meter"
            && dto.filter.category !== "Wireless Event-Based Sensor"
            && dto.filter.category !== "Wireless Infrared Beam Sensor"
            && dto.filter.category !== "Wireless 4-30mA Sensor")
            return ValidationError(
               "BadRequest",
               'Invalid filter category. Category must be "Xemote' +
               ' Accessory", "Xemote Gateway", "Wireless Temperature Sensor", "Wireless' +
               ' Humidity Sensor", "Wireless Ac Current Meter", "Wireless Event-Based' +
               ' Sensor", "Wireless Infrared Beam Sensor", or "Wireless 4-30mA Sensor".'
            );
      if (dto.filter.costPriceRange) {
         if (dto.filter.costPriceRange.start && (dto.filter.costPriceRange.start < 0))
            return ValidationError(
               "BadRequest",
               'Invalid cost price range. Cost price range' +
               ' start value must be greater than 0.'
            );
         if (dto.filter.costPriceRange.end && (dto.filter.costPriceRange.end < 0))
            return ValidationError(
               "BadRequest",
               'Invalid cost price range. Cost price range' +
               ' end value must be greater than 0.'
            );
         if ((dto.filter.costPriceRange.start && dto.filter.costPriceRange.end)
            && (dto.filter.costPriceRange.end < dto.filter.costPriceRange.start))
            return ValidationError(
               "BadRequest",
               'Invalid cost price range. Cost' +
               ' price range' +
               ' end value must be greater than start value.'
            );
      }
      if (dto.filter.markupRange) {
         if (dto.filter.markupRange.start && (dto.filter.markupRange.start < 0))
            return ValidationError(
               "BadRequest",
               'Invalid markup range. Markup range' +
               ' start value must be greater than 0.'
            );
         if (dto.filter.markupRange.end && (dto.filter.markupRange.end < 0))
            return ValidationError(
               "BadRequest",
               'Invalid markup range. Markup range' +
               ' end value must be greater than 0.'
            );
         if ((dto.filter.markupRange.start && dto.filter.markupRange.end)
            && (dto.filter.markupRange.end < dto.filter.markupRange.start))
            return ValidationError(
               "BadRequest",
               'Invalid markup range. Markup range' +
               ' end value must be greater than start value.'
            );
      }

      if (dto.timestamps) {
         if (dto.timestamps.createdAt) {
            if (dto.timestamps.createdAt.start && isNaN(Date.parse(dto.timestamps.createdAt.start)))
               return ValidationError(
                  "BadRequest",
                  'Invalid createdAt start' +
                  ' date. Provide a valid ISO date string.'
               );
            if (dto.timestamps.createdAt.end && isNaN(Date.parse(dto.timestamps.createdAt.end)))
               return ValidationError(
                  "BadRequest",
                  'Invalid createdAt end' +
                  ' date. Provide a valid ISO date string.'
               );
         }
         if (dto.timestamps.updatedAt) {
            if (dto.timestamps.updatedAt.start && isNaN(Date.parse(dto.timestamps.updatedAt.start)))
               return ValidationError(
                  "BadRequest",
                  'Invalid updatedAt start' +
                  ' date. Provide a valid ISO date string.'
               );
            if (dto.timestamps.updatedAt.end && isNaN(Date.parse(dto.timestamps.updatedAt.end)))
               return ValidationError(
                  "BadRequest",
                  'Invalid updatedAt end' +
                  ' date. Provide a valid ISO date string.'
               );
         }
      }

      if (!dto.updateFields)
         return ValidationError(
            "BadRequest",
            'Invalid request. Update field' +
            ' required.'
         );
      if (dto.updateFields.newName && dto.updateFields.newName === '')
         return ValidationError(
            "BadRequest",
            'Invalid name. Name cannot be empty' +
            ' string.'
         );
      if (dto.updateFields.newCategory)
         if (dto.updateFields.newCategory !== "Xemote Gateway"
            && dto.updateFields.newCategory !== "Xemote Accessory"
            && dto.updateFields.newCategory !== "Wireless Temperature Sensor"
            && dto.updateFields.newCategory !== "Wireless Humidity Sensor"
            && dto.updateFields.newCategory !== "Wireless AC Current Meter"
            && dto.updateFields.newCategory !== "Wireless Event-Based Sensor"
            && dto.updateFields.newCategory !== "Wireless Infrared Beam Sensor"
            && dto.updateFields.newCategory !== "Wireless 4-30mA Sensor")
            return ValidationError(
               "BadRequest",
               'Invalid category. New category must be "Xemote' +
               ' Accessory", "Xemote Gateway", "Wireless Temperature Sensor", "Wireless' +
               ' Humidity Sensor", "Wireless Ac Current Meter", "Wireless Event-Based' +
               ' Sensor", "Wireless Infrared Beam Sensor", or "Wireless 4-30mA Sensor".'
            );
      if (dto.updateFields.newCostPrice) {
         if (dto.updateFields.newCostPrice.price && dto.updateFields.newCostPrice.price < 0)
            return ValidationError(
               "BadRequest",
               'Invalid price. Price must be' +
               ' greater than 0.'
            );
         if (dto.updateFields.newCostPrice.currency)
            if (dto.updateFields.newCostPrice.currency !== "ZAR" &&
               dto.updateFields.newCostPrice.currency !== "USD")
               return ValidationError(
                  "BadRequest",
                  'Invalid currency. Currency' +
                  ' must be "ZAR" or "USD".'
               );
      }
      if (dto.updateFields.newMarkup && dto.updateFields.newMarkup < 0)
         return ValidationError(
            "BadRequest",
            'Invalid markup. Markup' +
            ' must be greater than 0.'
         );
      return null;
   },

   validateDeleteProductDTO: async (dto : DeleteProductRequest) : Promise<ValidationError | null> => {
      if (!dto._id)
         return ValidationError("BadRequest", 'ID required.');
      if (!(await repository.exists(dto)))
         return ValidationError("NotFound", `Product "${dto._id}" not found.`);
      return null;
   },
});
