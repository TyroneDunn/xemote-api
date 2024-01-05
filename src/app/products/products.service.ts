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
   mapRequestToProductsRequest,
   mapToCreateProductRequest,
   mapToDeleteProductRequest,
   mapToGetProductRequest,
   mapToUpdateProductRequest,
   mapToUpdateProductsRequest,
} from "./products.utility";
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
         const getProductRequest : GetProductRequest = mapToGetProductRequest(request);
         const validationOutcome : ValidationOutcome = await validator.validateGetProductDTO(getProductRequest);
         if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result : Product | Error = await repository.getProduct(getProductRequest);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         return mapProductToSuccessResponse(result);
      },

      getProducts: async (request : Request) : Promise<Response> => {
         const productsRequest : ProductsRequest = mapRequestToProductsRequest(request);
         const validationOutcome : ValidationOutcome = await validator.validateProductsDTO(productsRequest);
         if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result : Product[] | Error = await repository.getProducts(productsRequest);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         const addPageData = (response : Response) : Response =>
            addRequestPageDataToResponse(request, response);
         return addPageData(mapProductsToSuccessResponse(result));
      },

      createProduct: async (request : Request) : Promise<Response> => {
         const createProductRequest : CreateProductRequest = mapToCreateProductRequest(request);
         const validationOutcome : ValidationOutcome = await validator.validateCreateProductDTO(createProductRequest);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result : Product | Error = await repository.createProduct(createProductRequest);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         // todo improve inventory repository error handling
         await inventoryRepository.createRecord({ productId: result._id, count: 0 });
         return mapProductToSuccessResponse(result);
      },

      updateProduct: async (request : Request) : Promise<Response> => {
         const updateProductRequest : UpdateProductRequest = mapToUpdateProductRequest(request);
         const validationOutcome : ValidationOutcome = await validator.validateUpdateProductDTO(updateProductRequest);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result : Product | Error = await repository.updateProduct(updateProductRequest);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         return mapProductToSuccessResponse(result);
      },

      updateProducts: async (request : Request) : Promise<Response> => {
         const updateProductsRequest : UpdateProductsRequest = mapToUpdateProductsRequest(request);
         const validationOutcome : ValidationOutcome = await validator.validateUpdateProductsDTO(updateProductsRequest);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result : CommandResult | Error = await repository.updateProducts(updateProductsRequest);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         return mapUpdateResultToResponse(result);
      },

      deleteProduct: async (request : Request) : Promise<Response> => {
         const deleteProductRequest : DeleteProductRequest = mapToDeleteProductRequest(request);
         const validationOutcome : ValidationOutcome = await validator.validateDeleteProductDTO(deleteProductRequest);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result : CommandResult | Error = await repository.deleteProduct(deleteProductRequest);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         // todo improve inventory repository error handling
         await inventoryRepository.deleteRecord({ productId: deleteProductRequest._id });
         return mapDeleteResultToResponse(result);
      },

      deleteProducts: async (request : Request) : Promise<Response> => {
         const productsRequest : ProductsRequest = mapRequestToProductsRequest(request);
         const validationOutcome : ValidationOutcome = await validator.validateProductsDTO(productsRequest);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const products : Product[] | Error = await repository.getProducts(productsRequest);
         if (isError(products)) return mapErrorToInternalServerErrorResponse(products);
         products.forEach(async (product) => {
            // todo improve inventory repository error handling
            await inventoryRepository.deleteRecord({ productId: product._id });
         });
         const result : CommandResult | Error = await repository.deleteProducts(productsRequest);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         return mapDeleteResultToResponse(result);
      },
   });
