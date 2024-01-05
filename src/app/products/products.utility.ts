import {
   mapRequestToPage,
   mapRequestToTimestamps,
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
   Product,
   ProductsRequest,
   ProductsSortOption,
   ProductType,
   UpdateProductRequest,
   UpdateProductsRequest,
} from "./products.type";
import { Price } from "./price.type";

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
   name  : request.payload['name'],
   type  : request.payload['type'] as ProductType,
   costPrice: request.payload['costPrice'] as Price,
   markup: parseFloat(request.payload['markup']),
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
