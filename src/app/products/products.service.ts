import { handleRequest, Request, RequestHandler, Response } from "@hals/common";
import { ProductsRepository } from "./products-repository.type";
import { ProductsValidator } from "./products.validator";
import {
   mapCreateProductResultToResponse,
   mapDeleteProductResultToResponse,
   mapDeleteProductsResultToResponse,
   mapGetProductResultToResponse,
   mapGetProductsResultToResponse,
   mapRequestToProductsRequest,
   mapToCreateProductRequest,
   mapToDeleteProductRequest,
   mapToGetProductRequest,
   mapToUpdateProductRequest,
   mapToUpdateProductsRequest,
   mapUpdateProductResultToResponse,
   mapUpdateProductsResultToResponse,
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
) : ProductsService =>
   ({
      getProduct: async (request : Request) : Promise<Response> =>
         handleRequest(
            mapToGetProductRequest(request),
            validator.validateGetProductDTO,
            mapGetProductResultToResponse(productsRepository.getProduct),
         ),

      getProducts: async (request : Request) : Promise<Response> =>
         handleRequest(
            mapRequestToProductsRequest(request),
            validator.validateProductsDTO,
            mapGetProductsResultToResponse(productsRepository.getProducts),
         ),

      createProduct: async (request : Request) : Promise<Response> =>
         handleRequest(
            mapToCreateProductRequest(request),
            validator.validateCreateProductDTO,
            mapCreateProductResultToResponse(
               productsRepository.createProduct,
               inventoryRepository.createRecord
            ),
         ),

      updateProduct: async (request : Request) : Promise<Response> =>
         handleRequest(
            mapToUpdateProductRequest(request),
            validator.validateUpdateProductDTO,
            mapUpdateProductResultToResponse(productsRepository.updateProduct),
         ),

      updateProducts: async (request : Request) : Promise<Response> =>
         handleRequest(
            mapToUpdateProductsRequest(request),
            validator.validateUpdateProductsDTO,
            mapUpdateProductsResultToResponse(productsRepository.updateProducts),
         ),

      deleteProduct: async (request : Request) : Promise<Response> =>
         handleRequest(
            mapToDeleteProductRequest(request),
            validator.validateDeleteProductDTO,
            mapDeleteProductResultToResponse(
               productsRepository.deleteProduct,
               inventoryRepository.deleteRecord
            ),
         ),

      deleteProducts: async (request : Request) : Promise<Response> =>
         handleRequest(
            mapRequestToProductsRequest(request),
            validator.validateProductsDTO,
            mapDeleteProductsResultToResponse(
               productsRepository.getProducts,
               productsRepository.deleteProducts,
               inventoryRepository.deleteRecord
            ),
         ),
   });
