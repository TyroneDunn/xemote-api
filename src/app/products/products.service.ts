import { handleRequest, Request, RequestHandler, Response } from "@hals/common";
import { ProductsRepository } from "./products-repository.type";
import { ProductsValidator } from "./products.validator";
import {
   createProductAndItsInventoryRecordsAndMapResultToResponse,
   deleteProductAndItsInventoryRecordAndMapResultToResponse,
   deleteProductsAndTheirInventoryRecordsAndMapResultToResponse,
   getProductAndMapResultToResponse,
   getProductsAndMapResultToResponse,
   mapRequestToProductsRequest,
   mapToCreateProductRequest,
   mapToDeleteProductRequest,
   mapToGetProductRequest,
   mapToUpdateProductRequest,
   mapToUpdateProductsRequest,
   updateProductAndMapResultToResponse,
   updateProductsAndMapResultToResponse,
} from "./products.utility";
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
   productsRepository : ProductsRepository,
   validator : ProductsValidator,
   inventoryRepository : InventoryRepository
) : ProductsService => ({
   getProduct: async (request : Request) : Promise<Response> =>
      handleRequest(
         mapToGetProductRequest(request),
         validator.validateGetProductDTO,
         getProductAndMapResultToResponse(productsRepository.getProduct),
      ),

   getProducts: async (request : Request) : Promise<Response> =>
      handleRequest(
         mapRequestToProductsRequest(request),
         validator.validateProductsDTO,
         getProductsAndMapResultToResponse(productsRepository.getProducts),
      ),

   createProduct: async (request : Request) : Promise<Response> =>
      handleRequest(
         mapToCreateProductRequest(request),
         validator.validateCreateProductDTO,
         createProductAndItsInventoryRecordsAndMapResultToResponse(
            productsRepository.createProduct,
            inventoryRepository.createRecord
         ),
      ),

   updateProduct: async (request : Request) : Promise<Response> =>
      handleRequest(
         mapToUpdateProductRequest(request),
         validator.validateUpdateProductDTO,
         updateProductAndMapResultToResponse(productsRepository.updateProduct),
      ),

   updateProducts: async (request : Request) : Promise<Response> =>
      handleRequest(
         mapToUpdateProductsRequest(request),
         validator.validateUpdateProductsDTO,
         updateProductsAndMapResultToResponse(productsRepository.updateProducts),
      ),

   deleteProduct: async (request : Request) : Promise<Response> =>
      handleRequest(
         mapToDeleteProductRequest(request),
         validator.validateDeleteProductDTO,
         deleteProductAndItsInventoryRecordAndMapResultToResponse(
            productsRepository.deleteProduct,
            inventoryRepository.deleteRecord
         ),
      ),

   deleteProducts: async (request : Request) : Promise<Response> =>
      handleRequest(
         mapRequestToProductsRequest(request),
         validator.validateProductsDTO,
         deleteProductsAndTheirInventoryRecordsAndMapResultToResponse(
            productsRepository.getProducts,
            productsRepository.deleteProducts,
            inventoryRepository.deleteRecord
         ),
      ),
});
