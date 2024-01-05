import {
   addRequestPageDataToResponse,
   CommandResult,
   Error,
   isError,
   mapDeleteResultToResponse,
   mapErrorToInternalServerErrorResponse,
   mapUpdateResultToResponse,
   mapValidationOutcomeToErrorResponse,
   Request,
   RequestHandler,
   Response,
   ValidationOutcome,
} from "@hals/common";
import { ProductsRepository } from "./products-repository.type";
import { ProductsDtosValidator } from "./products-dtos.validator";
import {
   mapProductsToSuccessResponse,
   mapProductToSuccessResponse,
   mapRequestToProductsDTO,
   mapToCreateProductDTO,
   mapToDeleteProductDTO,
   mapToGetProductDTO,
   mapToUpdateProductDTO,
   mapToUpdateProductsDTO,
} from "./products-dtos.utility";
import {
   CreateProductRequest,
   DeleteProductRequest,
   GetProductRequest,
   Product,
   ProductsRequest,
   UpdateProductRequest,
   UpdateProductsRequest,
} from "./products.type";
import { InventoryRepository } from "../inventory/inventory-repository.type";

export type ProductsService = {
   getProduct : RequestHandler,
   getProducts : RequestHandler,
   createProduct : RequestHandler,
   updateProduct : RequestHandler,
   updateProducts : RequestHandler,
   deleteProduct : RequestHandler,
   deleteProducts : RequestHandler,
};

export const ProductsService = (
   repository : ProductsRepository,
   validator : ProductsDtosValidator,
   inventoryRepository : InventoryRepository) : ProductsService =>
   ({
      getProduct: async (request : Request) : Promise<Response> => {
         const dto : GetProductRequest = mapToGetProductDTO(request);
         const validationOutcome : ValidationOutcome = await validator.validateGetProductDTO(dto);
         if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result : Product | Error = await repository.getProduct(dto);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         return mapProductToSuccessResponse(result);
      },

      getProducts: async (request : Request) : Promise<Response> => {
         const dto : ProductsRequest = mapRequestToProductsDTO(request);
         const validationOutcome : ValidationOutcome = await validator.validateProductsDTO(dto);
         if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result : Product[] | Error = await repository.getProducts(dto);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         const addPageData = (response : Response) : Response =>
            addRequestPageDataToResponse(request, response);
         return addPageData(mapProductsToSuccessResponse(result));
      },

      createProduct: async (request : Request) : Promise<Response> => {
         const dto : CreateProductRequest = mapToCreateProductDTO(request);
         const validationOutcome : ValidationOutcome = await validator.validateCreateProductDTO(dto);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result : Product | Error = await repository.createProduct(dto);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         // todo improve inventory repository error handling
         await inventoryRepository.createRecord({ productId: result._id, count: 0 });
         return mapProductToSuccessResponse(result);
      },

      updateProduct: async (request : Request) : Promise<Response> => {
         const dto : UpdateProductRequest = mapToUpdateProductDTO(request);
         const validationOutcome : ValidationOutcome = await validator.validateUpdateProductDTO(dto);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result : Product | Error = await repository.updateProduct(dto);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         return mapProductToSuccessResponse(result);
      },

      updateProducts: async (request : Request) : Promise<Response> => {
         const dto : UpdateProductsRequest = mapToUpdateProductsDTO(request);
         const validationOutcome : ValidationOutcome = await validator.validateUpdateProductsDTO(dto);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result : CommandResult | Error = await repository.updateProducts(dto);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         return mapUpdateResultToResponse(result);
      },

      deleteProduct: async (request : Request) : Promise<Response> => {
         const dto : DeleteProductRequest = mapToDeleteProductDTO(request);
         const validationOutcome : ValidationOutcome = await validator.validateDeleteProductDTO(dto);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result : CommandResult | Error = await repository.deleteProduct(dto);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         // todo improve inventory repository error handling
         await inventoryRepository.deleteRecord({ productId: dto._id });
         return mapDeleteResultToResponse(result);
      },

      deleteProducts: async (request : Request) : Promise<Response> => {
         const dto : ProductsRequest = mapRequestToProductsDTO(request);
         const validationOutcome : ValidationOutcome = await validator.validateProductsDTO(dto);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const products : Product[] | Error = await repository.getProducts(dto);
         if (isError(products)) return mapErrorToInternalServerErrorResponse(products);
         products.forEach(async (product) => {
            // todo improve inventory repository error handling
            await inventoryRepository.deleteRecord({ productId: product._id });
         });
         const result : CommandResult | Error = await repository.deleteProducts(dto);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         return mapDeleteResultToResponse(result);
      },
   });
