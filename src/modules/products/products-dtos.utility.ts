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
import {DateRange} from "../../shared/date-range.type";
import {Pagination} from "../../shared/pagination.type";
import {Price} from "../../shared/price.type";

export const mapRequestToGetProductDTO = (request: Request): GetProductDTO => ({
    _id: request.paramMap['id'],
});

export const mapRequestToGetProductsDTO = (request: Request): GetProductsDTO =>
    ({
        filter: {
            ...request.queryParamMap['name'] && {name: request.queryParamMap['name']},
            ...request.queryParamMap['nameRegex'] && {nameRegex: request.queryParamMap['nameRegex']},
            ...request.queryParamMap['type'] && {type: request.queryParamMap['type'] as ProductType},
            ...request.queryParamMap['typeRegex'] && {typeRegex: request.queryParamMap['typeRegex']},
            ...request.queryParamMap['costRange'] && {
                costRange: {
                    start: JSON.parse(request.queryParamMap['costRange']).start,
                    end: JSON.parse(request.queryParamMap['costRange']).end,
                }
            },
            ...request.queryParamMap['markupRange'] && {markupRange: JSON.parse(request.queryParamMap['markupRange']) as NumberRange},
        },
        ...request.queryParamMap['dateRange'] && {
            dateRange: {
                ...(JSON.parse(request.queryParamMap['dateRange']) as DateRange).dateCreated &&
                {dateCreated: (JSON.parse(request.queryParamMap['dateRange']) as DateRange).dateCreated},
                ...(JSON.parse(request.queryParamMap['dateRange']) as DateRange).lastUpdated &&
                {lastUpdated: (JSON.parse(request.queryParamMap['dateRange']) as DateRange).lastUpdated},
            }
        },
        ...request.queryParamMap['sort'] && {sort: JSON.parse(request.queryParamMap['sort']) as ProductsSort[]},
        ...request.queryParamMap['page'] && {page: JSON.parse(request.queryParamMap['page']) as Pagination},
    });

export const mapRequestToCreateProductDTO = (request: Request): CreateProductDTO => ({
    name: request.payload['name'],
    type: request.payload['type'] as ProductType,
    costPrice: request.payload['costPrice'] as Price,
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
    updateFields: {
        newName: request.payload['newName'],
        newType: request.payload['newType'] as ProductType,
        newCostOfGood: JSON.parse(request.payload['newCost']) as Price,
        newMarkup: parseFloat(request.payload['newMarkup']),
    }
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
        updateFields: {
            newName: request.payload['newName'],
            newType: request.payload['newType'] as ProductType,
            newCostOfGood: JSON.parse(request.payload['newCost']) as Price,
            newMarkup: parseFloat(request.payload['newMarkup']),
        }
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
