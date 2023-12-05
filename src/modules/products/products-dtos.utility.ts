import {Product, ProductType} from "./product.type";
import {Request, Response} from "@hals/core";
import {
    CreateProductDTO,
    DeleteProductDTO,
    DeleteProductsDTO,
    GetProductDTO,
    GetProductsDTO,
    ProductsSort,
    UpdateProductDTO,
    UpdateProductsDTO
} from "./products-dtos.type";
import {NumberRange} from "../../shared/number-range.type";
import {DateRange} from "../../shared/date-range-filter.type";
import {Pagination} from "../../shared/pagination-options.type";
import {Price} from "../../shared/price.type";

export const mapRequestToGetProductDTO = (request: Request): GetProductDTO => ({
    _id: request.paramMap['id'],
});

export const mapRequestToGetProductsDTO = (request: Request): GetProductsDTO => ({
    filter: {
        name: request.queryParamMap['name'],
        nameRegex: request.queryParamMap['nameRegex'],
        type: request.queryParamMap['type'] as ProductType,
        typeRegex: request.queryParamMap['typeRegex'],
        costRange: JSON.parse(request.queryParamMap['costRange']) as NumberRange,
        markupRange: JSON.parse(request.queryParamMap['markupRange']) as NumberRange,
    },
    dateRange: JSON.parse(request.queryParamMap['dateRange']) as DateRange,
    sort: JSON.parse(request.queryParamMap['sort']) as ProductsSort[],
    page: JSON.parse(request.queryParamMap['page']) as Pagination,
});

export const mapRequestToCreateProductDTO = (request: Request): CreateProductDTO => ({
    name: request.payload['name'],
    type: request.payload['type'] as ProductType,
    costOfGood: JSON.parse(request.payload['cost']) as Price,
    markup: parseFloat(request.payload['markup']),
});

export const mapRequestToDeleteProductDTO = (request: Request): DeleteProductDTO => ({
    _id: request.paramMap['id'],
});

export const mapRequestToDeleteProductsDTO = (request: Request): DeleteProductsDTO => ({
    filter: {
        name: request.queryParamMap['name'],
        nameRegex: request.queryParamMap['nameRegex'],
        type: request.queryParamMap['type'] as ProductType,
        typeRegex: request.queryParamMap['typeRegex'],
        costRange: JSON.parse(request.queryParamMap['costRange']) as NumberRange,
        markupRange: JSON.parse(request.queryParamMap['markupRange']) as NumberRange,
    },
    dateRange: JSON.parse(request.queryParamMap['dateRange']) as DateRange,
    sort: JSON.parse(request.queryParamMap['sort']) as ProductsSort[],
    page: JSON.parse(request.queryParamMap['page']) as Pagination,
});

export const mapRequestToUpdateProductDTO = (request: Request): UpdateProductDTO => ({
    _id: request.paramMap['id'],
    newName: request.payload['newName'],
    newType: request.payload['newType'] as ProductType,
    newCostOfGood: JSON.parse(request.payload['newCost']) as Price,
    newMarkup: parseFloat(request.payload['newMarkup']),
});

export const mapRequestToUpdateProductsDTO = (request: Request): UpdateProductsDTO => {
    return {
        filter: {
            name: request.queryParamMap['name'],
            nameRegex: request.queryParamMap['nameRegex'],
            type: request.queryParamMap['type'] as ProductType,
            typeRegex: request.queryParamMap['typeRegex'],
            costRange: JSON.parse(request.queryParamMap['costRange']) as NumberRange,
            markupRange: JSON.parse(request.queryParamMap['markupRange']) as NumberRange,
        },
        dateRange: JSON.parse(request.queryParamMap['dateRange']) as DateRange,
        sort: JSON.parse(request.queryParamMap['sort']) as ProductsSort[],
        page: JSON.parse(request.queryParamMap['page']) as Pagination,
        newName: request.payload['newName'],
        newType: request.payload['newType'] as ProductType,
        newCostOfGood: JSON.parse(request.payload['newCost']) as Price,
        newMarkup: parseFloat(request.payload['newMarkup']),
    };
};

export const mapProductToResponse = (product: Product, status: number): Response =>
    ({
        status: status,
        collection: [product],
        count: 1,
    });

export const mapProductsToResponse = (products: Product[], status: number): Response =>
    ({
        status: status,
        collection: [products],
        count: products.length,
    });

export const addRequestPageDataToResponse = (request: Request, response: Response): Response =>
    ({
        ...response,
        index: parseInt(request.queryParamMap['index']),
        limit: parseInt(request.queryParamMap['limit']),
    });
