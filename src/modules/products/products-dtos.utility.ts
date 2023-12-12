import {Product, ProductType} from "./product.type";
import {Request, Response} from "@hals/core";
import {
    CreateProductDTO,
    DeleteProductDTO,
    ProductsDTO,
    GetProductDTO,
    ProductsSortOptions,
    UpdateProductDTO,
    UpdateProductsDTO
} from "./products-dtos.type";
import {NumberRange} from "../../shared/number-range.type";
import {DateRange} from "../../shared/date-range.type";
import {Price} from "../../shared/price.type";
import {OrderOptions} from "../../shared/order-options.type";

export const mapToGetProductDTO = (request: Request): GetProductDTO => ({
    _id: request.paramMap['id'],
});

export const mapRequestToProductsDTO = (request: Request): ProductsDTO =>
    ({
        ...mapToProductsFilter(request),
        ...mapToTimestamps(request),
        ...mapToProductsSort(request),
        ...mapToPage(request),
    });

export const mapToCreateProductDTO = (request: Request): CreateProductDTO => ({
    name: request.payload['name'],
    type: request.payload['type'] as ProductType,
    costPrice: request.payload['costPrice'] as Price,
    markup: parseFloat(request.payload['markup']),
});

export const mapToUpdateProductDTO = (request: Request): UpdateProductDTO => ({
    _id: request.paramMap['id'],
    ...mapToUpdateFields(request)
});

export const mapToUpdateProductsDTO = (request: Request): UpdateProductsDTO => ({
    ...mapToProductsFilter(request),
    ...mapToTimestamps(request),
    ...mapToProductsSort(request),
    ...mapToPage(request),
    ...mapToUpdateFields(request)
});

export const mapToDeleteProductDTO = (request: Request): DeleteProductDTO => ({
    _id: request.paramMap['id'],
});

const mapToProductsFilter = (request: Request) =>
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
        }
    });

const mapToTimestamps = (request: Request) => ({
    ...(request.queryParamMap['createdAt'] && !request.queryParamMap['updatedAt']) && {
        timestamps: {
            createdAt: (JSON.parse(request.queryParamMap['createdAt']) as DateRange)
        },
    },
    ...(request.queryParamMap['updatedAt'] && !request.queryParamMap['createdAt']) && {
        timestamps: {
            updatedAt: (JSON.parse(request.queryParamMap['updatedAt']) as DateRange)
        }
    },
    ...(request.queryParamMap['createdAt'] && request.queryParamMap['updatedAt']) && {
        timestamps: {
            createdAt: (JSON.parse(request.queryParamMap['createdAt']) as DateRange),
            updatedAt: (JSON.parse(request.queryParamMap['updatedAt']) as DateRange)
        },
    },
});

const mapToProductsSort = (request: Request) => ({
    ...(request.queryParamMap['sort'] && request.queryParamMap['order']) && {
        sort: {
            field: request.queryParamMap['sort'] as ProductsSortOptions,
            order: request.queryParamMap['order'] as OrderOptions,
        }
    },
});

const mapToPage = (request: Request) => ({
    ...(request.queryParamMap['index'] && request.queryParamMap['limit']) && {
        page: {
            index: parseInt(request.queryParamMap['index']),
            limit: parseInt(request.queryParamMap['limit'])
        }
    },
});

const mapToUpdateFields = (request: Request) => ({
    updateFields: {
        ...request.payload['newName'] && {newName: request.payload['newName']},
        ...request.payload['newType'] && {newType: request.payload['newType'] as ProductType},
        ...request.payload['newCostPrice'] && {newCostPrice: request.payload['newCostPrice'] as Price},
        ...request.payload['newMarkup'] && {newMarkup: parseFloat(request.payload['newMarkup'])},
    }
});

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
