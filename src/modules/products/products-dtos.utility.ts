import {Product, ProductType} from "./product.type";
import {Request, Response} from "@hals/core";
import {
    CreateProductDTO,
    DeleteProductDTO,
    DeleteProductsDTO,
    GetProductDTO,
    GetProductsDTO,
    ProductsSortOptions,
    UpdateProductDTO,
    UpdateProductsDTO
} from "./products-dtos.type";
import {NumberRange} from "../../shared/number-range.type";
import {DateRange} from "../../shared/date-range.type";
import {Pagination} from "../../shared/pagination.type";
import {Price} from "../../shared/price.type";
import {OrderOptions} from "../../shared/order-options.type";
import {Timestamps} from "../../shared/timestamps.type";

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
            ...request.queryParamMap['costPriceRange'] && {
                costPriceRange: JSON.parse(request.queryParamMap['costPriceRange']) as NumberRange,
            },
            ...request.queryParamMap['markupRange'] && {
                markupRange: JSON.parse(request.queryParamMap['markupRange']) as NumberRange
            },
        },
        ...(request.queryParamMap['createdAt'] && !request.queryParamMap['updatedAt']) && {
            timestamp: {
                createdAt: (JSON.parse(request.queryParamMap['createdAt']) as DateRange)
            },
        },
        ...(request.queryParamMap['updatedAt'] && !request.queryParamMap['createdAt']) && {
            timestamp: {
                updatedAt: (JSON.parse(request.queryParamMap['updatedAt']) as DateRange)
            }
        },
        ...(request.queryParamMap['createdAt'] && request.queryParamMap['updatedAt']) && {
            timestamp: {
                createdAt: (JSON.parse(request.queryParamMap['createdAt']) as DateRange),
                updatedAt: (JSON.parse(request.queryParamMap['updatedAt']) as DateRange)
            },
        },
        ...(request.queryParamMap['sort'] && request.queryParamMap['order']) && {
            sort: {
                field: request.queryParamMap['sort'] as ProductsSortOptions,
                order: request.queryParamMap['order'] as OrderOptions,
            }
        },

        ...(request.queryParamMap['index'] && request.queryParamMap['limit']) && {
            page: {
                index: parseInt(request.queryParamMap['index']),
                limit: parseInt(request.queryParamMap['limit'])
            }
        },
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
        costPriceRange: JSON.parse(request.queryParamMap['costRange']) as NumberRange,
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
            costPriceRange: JSON.parse(request.queryParamMap['costRange']) as NumberRange,
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
