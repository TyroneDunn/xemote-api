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
   ProductCategory,
   ProductsRequest,
   ProductsSortOption,
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
import { Either } from '../../shared/either.type';
import { InventoryRecord } from '../inventory/inventory-records.type';

export const mapRequestToGetProductRequest = (request : Request) : GetProductRequest => ({
   _id: request.paramMap['id'],
});

export const mapRequestToProductsRequest = (request : Request) : ProductsRequest => ({
   ...mapToProductsRequestFilter(request),
   ...mapRequestToTimestamps(request),
   ...mapToProductsSort(request),
   ...mapRequestToPage(request),
});

export const mapRequestToCreateProductRequest = (request : Request) : CreateProductRequest => ({
   name     : request.payload['name'],
   category : request.payload['category'] as ProductCategory,
   costPrice: request.payload['costPrice'] as Price,
   markup   : parseFloat(request.payload['markup']),
});

export const mapRequestToUpdateProductRequest = (request : Request) : UpdateProductRequest => ({
   _id: request.paramMap['id'],
   ...mapToUpdateFields(request),
});

export const mapRequestToUpdateProductsRequest = (request : Request) : UpdateProductsRequest => ({
   ...mapToProductsRequestFilter(request),
   ...mapRequestToTimestamps(request),
   ...mapToUpdateFields(request),
});

export const mapRequestToDeleteProductRequest = (request : Request) : DeleteProductRequest => ({
   _id: request.paramMap['id'],
});

const mapToProductsRequestFilter = (request : Request) => ({
   filter: {
      ...request.queryParamMap['name'] && { name: request.queryParamMap['name'] },
      ...request.queryParamMap['nameRegex'] && { nameRegex: request.queryParamMap['nameRegex'] },
      ...request.queryParamMap['category'] && { category: request.queryParamMap['category'] as ProductCategory },
      ...request.queryParamMap['categoryRegex'] && { categoryRegex: request.queryParamMap['categoryRegex'] },
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
      ...request.payload['newType'] && { newType: request.payload['newType'] as ProductCategory },
      ...request.payload['newCostPrice'] && { newCostPrice: request.payload['newCostPrice'] as Price },
      ...request.payload['newMarkup'] && { newMarkup: parseFloat(request.payload['newMarkup']) },
   },
});

export const mapProductToSuccessResponse = (product : Product) : Response => ({
   status     : OK,
   collection : [ product ],
   count      : 1,
});

export const mapProductsToSuccessResponse = (products : Product[]) : Response => ({
   status     : OK,
   collection : [ products ],
   count      : products.length,
});

export const getProductAndMapResultToResponse = (getProduct : GetProduct) =>
   async (getProductRequest : GetProductRequest) : Promise<Response> => {
      const result : Product | Error = await getProduct(getProductRequest);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      else return mapProductToSuccessResponse(result);
   };

export const getProductsAndMapResultToResponse = (getProducts : GetProducts) =>
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

export const createProductAndItsInventoryRecordsAndMapResultToResponse = (
   createProduct : CreateProduct,
   createRecord : CreateRecord,
) => async (createProductRequest : CreateProductRequest) : Promise<Response> => {
   const createProductResult : Product | Error =
      await createProduct(createProductRequest);
   if (isError(createProductResult))
      return mapErrorToInternalServerErrorResponse(createProductResult);

   const createRecordResult: InventoryRecord | Error =
      await createRecord({ productId: createProductResult._id, count: 0 });
   if (isError(createRecordResult)) return mapErrorToInternalServerErrorResponse(createRecordResult);

   return mapProductToSuccessResponse(createProductResult);
};

export const updateProductAndMapResultToResponse = (updateProduct : UpdateProduct) =>
   async (updateProductRequest : UpdateProductRequest) : Promise<Response> => {
      const result : Product | Error = await updateProduct(updateProductRequest);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      else return mapProductToSuccessResponse(result);
   };

export const updateProductsAndMapResultToResponse = (updateProducts : UpdateProducts) =>
   async (updateProductsRequest : UpdateProductsRequest) : Promise<Response> => {
      const result : CommandResult | Error = await updateProducts(updateProductsRequest);
      if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
      else return mapUpdateResultToResponse(result);
   };

export const deleteProductAndItsInventoryRecordAndMapResultToResponse = (
   deleteProduct : DeleteProduct,
   deleteRecord : DeleteRecord,
) => async (deleteProductRequest : DeleteProductRequest) : Promise<Response> => {
   const deleteRecordResult : Either<Error, CommandResult> = await deleteRecord({ productId: deleteProductRequest._id });
   if (isError(deleteRecordResult)) return mapErrorToInternalServerErrorResponse(deleteRecordResult);

   const deleteProductResult : CommandResult | Error = await deleteProduct(deleteProductRequest);
   if (isError(deleteProductResult)) return mapErrorToInternalServerErrorResponse(deleteProductResult);

   return mapDeleteResultToResponse(deleteProductResult);
};

export const deleteProductsAndTheirInventoryRecordsAndMapResultToResponse = (
   getProducts : GetProducts,
   deleteProducts : DeleteProducts,
   deleteRecord : DeleteRecord,
) => async (productsRequest : ProductsRequest) : Promise<Response> => {
   const getProductsResult : Product[] | Error = await getProducts(productsRequest);
   if (isError(getProductsResult)) return mapErrorToInternalServerErrorResponse(getProductsResult);

   const deleteRecordsResults : Either<Error, CommandResult>[] = await deleteRecords(getProductsResult, deleteRecord, []);
   const deleteRecordsError : Error | null = filterErrorsFromDeleteResultsAndReduce(deleteRecordsResults);
   if (isError(deleteRecordsError)) return mapErrorToInternalServerErrorResponse(deleteRecordsError);

   const deleteProductsResult : CommandResult | Error = await deleteProducts(productsRequest);
   if (isError(deleteProductsResult)) return mapErrorToInternalServerErrorResponse(deleteProductsResult);
   return mapDeleteResultToResponse(deleteProductsResult);
};

const deleteRecords = async (
   products : Product[],
   deleteRecord : DeleteRecord,
   results : Either<Error, CommandResult>[],
) : Promise<Either<Error, CommandResult>[]> => {
   if (products.length === 0) return results;
   else {
      const deleteResult : Either<Error, CommandResult> =
         await deleteRecord({ productId: products[0]._id });
      return await deleteRecords(products.slice(1), deleteRecord, results.concat(deleteResult));
   }
};

const filterErrorsFromDeleteResultsAndReduce = (xs : Either<Error, CommandResult>[]) : Error | null => {
   const errors : Error[] = xs.filter(isError);
   if (errors.length === 0) return null;
   else return errors.reduce((acc : Error, error : Error) : Error =>
         Error('Internal', acc.message.concat(error.message)));
};
