import { Product, ProductType } from "./product.type";
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
   CreateProductDTO,
   DeleteProductDTO,
   GetProductDTO,
   ProductsDTO,
   ProductsSortOptions,
   UpdateProductDTO,
   UpdateProductsDTO,
} from "./products-dtos.type";
import { Price } from "./price.type";

export const mapToGetProductDTO = (request: Request): GetProductDTO => ({
   _id: request.paramMap['id'],
});

export const mapRequestToProductsDTO = (request: Request): ProductsDTO =>
   ({
      ...mapToProductsFilter(request),
      ...mapRequestToTimestamps(request),
      ...mapToProductsSort(request),
      ...mapRequestToPage(request),
   });

export const mapToCreateProductDTO = (request: Request): CreateProductDTO => ({
   name: request.payload['name'],
   type: request.payload['type'] as ProductType,
   costPrice: request.payload['costPrice'] as Price,
   markup: parseFloat(request.payload['markup']),
});

export const mapToUpdateProductDTO = (request: Request): UpdateProductDTO => ({
   _id: request.paramMap['id'],
   ...mapToUpdateFields(request),
});

export const mapToUpdateProductsDTO = (request: Request): UpdateProductsDTO => ({
   ...mapToProductsFilter(request),
   ...mapRequestToTimestamps(request),
   ...mapToUpdateFields(request),
});

export const mapToDeleteProductDTO = (request: Request): DeleteProductDTO => ({
   _id: request.paramMap['id'],
});

const mapToProductsFilter = (request: Request) =>
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

const mapToProductsSort = (request: Request) => ({
   ...(request.queryParamMap['sort'] && request.queryParamMap['order']) && {
      sort: {
         field: request.queryParamMap['sort'] as ProductsSortOptions,
         order: request.queryParamMap['order'] as OrderOption,
      },
   },
});

const mapToUpdateFields = (request: Request) => ({
   updateFields: {
      ...request.payload['newName'] && { newName: request.payload['newName'] },
      ...request.payload['newType'] && { newType: request.payload['newType'] as ProductType },
      ...request.payload['newCostPrice'] && { newCostPrice: request.payload['newCostPrice'] as Price },
      ...request.payload['newMarkup'] && { newMarkup: parseFloat(request.payload['newMarkup']) },
   },
});

export const mapProductToSuccessResponse = (product: Product): Response =>
   ({
      status: OK,
      collection: [ product ],
      count: 1,
   });

export const mapProductsToSuccessResponse = (products: Product[]): Response =>
   ({
      status: OK,
      collection: [ products ],
      count: products.length,
   });
