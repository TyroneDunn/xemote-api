import {
   addPageDataToResponse,
   CommandResult,
   Error,
   isError,
   mapDeleteResultToResponse,
   mapErrorToInternalServerErrorResponse,
   mapRequestToPage,
   mapRequestToTimestamps,
   mapUpdateResultToResponse,
   NumberRange,
   OK,
   OrderOption,
   Request,
   Response,
} from "@hals/common";
import {
   CreateProductRequest,
   DeleteProductRequest,
   GetProductRequest,
   Price,
   Product,
   ProductsRequest,
   ProductsSortOption,
   ProductType,
   UpdateProductRequest,
   UpdateProductsRequest,
} from "./products.type";
import {
   CreateProduct,
   DeleteProduct,
   DeleteProducts,
   GetProduct,
   GetProducts,
   UpdateProduct,
   UpdateProducts,
} from "./products-repository.type";
import { CreateRecord, DeleteRecord } from "../inventory/inventory-repository.type";

export const mapToGetProductRequest = (request : Request) : GetProductRequest => ({
   _id: request.paramMap['id'],
});

export const mapRequestToProductsRequest = (request : Request) : ProductsRequest =>
   ({
      ...mapToProductsRequestFilter(request),
      ...mapRequestToTimestamps(request),
      ...mapToProductsSort(request),
      ...mapRequestToPage(request),
   });

export const mapToCreateProductRequest = (request : Request) : CreateProductRequest => ({
   name      : request.payload['name'],
   type      : request.payload['type'] as ProductType,
   costPrice : request.payload['costPrice'] as Price,
   markup    : parseFloat(request.payload['markup']),
});

export const mapToUpdateProductRequest = (request : Request) : UpdateProductRequest => ({
   _id: request.paramMap['id'],
   ...mapToUpdateFields(request),
});

export const mapToUpdateProductsRequest = (request : Request) : UpdateProductsRequest => ({
   ...mapToProductsRequestFilter(request),
   ...mapRequestToTimestamps(request),
   ...mapToUpdateFields(request),
});

export const mapToDeleteProductRequest = (request : Request) : DeleteProductRequest => ({
   _id: request.paramMap['id'],
});

const mapToProductsRequestFilter = (request : Request) =>
   ({
      filter: {
         ...request.queryParamMap['name'] && { name: request.queryParamMap['name'] },
         ...request.queryParamMap['nameRegex'] && { nameRegex: request.queryParamMap['nameRegex'] },
         ...request.queryParamMap['type'] && { type: request.queryParamMap['type'] as ProductType },
         ...request.queryParamMap['typeRegex'] && { typeRegex: request.queryParamMap['typeRegex'] },
         ...request.queryParamMap['costPriceRange'] && {
            costPriceRange: JSON.parse(request.queryParamMap['costPriceRange']) as NumberRange,
         },
         ...request.queryParamMap['markupRange'] && {
            markupRange: JSON.parse(request.queryParamMap['markupRange']) as NumberRange,
         },
      },
   });

const mapToProductsSort = (request : Request) => ({
   ...(request.queryParamMap['sort'] && request.queryParamMap['order']) && {
      sort: {
         field: request.queryParamMap['sort'] as ProductsSortOption,
         order: request.queryParamMap['order'] as OrderOption,
      },
   },
});

const mapToUpdateFields = (request : Request) => ({
   updateFields: {
      ...request.payload['newName'] && { newName: request.payload['newName'] },
      ...request.payload['newType'] && { newType: request.payload['newType'] as ProductType },
      ...request.payload['newCostPrice'] && { newCostPrice: request.payload['newCostPrice'] as Price },
      ...request.payload['newMarkup'] && { newMarkup: parseFloat(request.payload['newMarkup']) },
   },
});

export const mapProductToSuccessResponse = (product : Product) : Response =>
   ({
      status     : OK,
      collection : [ product ],
      count      : 1,
   });

export const mapProductsToSuccessResponse = (products : Product[]) : Response =>
   ({
      status     : OK,
      collection : [ products ],
      count      : products.length,
   });

export const mapGetProductResultToResponse = (getProduct : GetProduct) =>
   async (getProductRequest : GetProductRequest) : Promise<Response> => {
      const result : Product | Error = await getProduct(getProductRequest);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      else return mapProductToSuccessResponse(result);
   };

export const mapGetProductsResultToResponse = (getProducts : GetProducts) =>
   async (productsRequest : ProductsRequest) : Promise<Response> => {
      const getProductsResult : Product[] | Error = await getProducts(productsRequest);
      if (isError(getProductsResult))
         return mapErrorToInternalServerErrorResponse(getProductsResult);
      else {
         const response : Response = mapProductsToSuccessResponse(getProductsResult);
         if (productsRequest.page === undefined) return response;
         else return addPageDataToResponse(productsRequest.page, response);
      }
   };

export const mapCreateProductResultToResponse = (
   createProduct : CreateProduct,
   createRecord : CreateRecord,
) => async (createProductRequest : CreateProductRequest) : Promise<Response> => {
   const createProductResult : Product | Error =
      await createProduct(createProductRequest);
   if (isError(createProductResult))
      return mapErrorToInternalServerErrorResponse(createProductResult);
   // todo improve inventory repository error handling
   await createRecord({ productId: createProductResult._id, count: 0 });
   return mapProductToSuccessResponse(createProductResult);
};

export const mapUpdateProductResultToResponse = (updateProduct : UpdateProduct) =>
   async (updateProductRequest : UpdateProductRequest) : Promise<Response> => {
      const result : Product | Error = await updateProduct(updateProductRequest);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      else return mapProductToSuccessResponse(result);
   };

export const mapUpdateProductsResultToResponse = (updateProducts : UpdateProducts) =>
   async (updateProductsRequest : UpdateProductsRequest) : Promise<Response> => {
      const result : CommandResult | Error =
         await updateProducts(updateProductsRequest);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      else return mapUpdateResultToResponse(result);
   };

export const mapDeleteProductResultToResponse = (
   deleteProduct : DeleteProduct,
   deleteRecord : DeleteRecord,
) =>
   async (deleteProductRequest : DeleteProductRequest) : Promise<Response> => {
      const result : CommandResult | Error = await deleteProduct(deleteProductRequest);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      // todo improve inventory repository error handling
      await deleteRecord({ productId: deleteProductRequest._id });
      return mapDeleteResultToResponse(result);
   };

export const mapDeleteProductsResultToResponse = (
   getProducts : GetProducts,
   deleteProducts : DeleteProducts,
   deleteRecord : DeleteRecord,
) =>
   async (productsRequest : ProductsRequest) : Promise<Response> => {
      const products : Product[] | Error = await getProducts(productsRequest);
      if (isError(products)) return mapErrorToInternalServerErrorResponse(products);
      products.forEach(async (product) => {
         // todo improve inventory repository error handling
         await deleteRecord({ productId: product._id });
      });
      const deleteProductsResult : CommandResult | Error =
         await deleteProducts(productsRequest);
      if (isError(deleteProductsResult))
         return mapErrorToInternalServerErrorResponse(deleteProductsResult);
      return mapDeleteResultToResponse(deleteProductsResult);
   };
