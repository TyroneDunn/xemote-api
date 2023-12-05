import {ProductType} from "./product.type";
import {DateRangeFilter} from "../../shared/date-range-filter.type";
import {PaginationOptions} from "../../shared/pagination-options.type";
import {Price} from "../../shared/price.type";
import {NumberRange} from "../../shared/number-range.type";
import {OrderOptions} from "../../shared/order-options.type";

export type GetProductDTO = { _id: string };

export type GetProductsDTO = {
    filter?: ProductsFilter,
    dateRange?: DateRangeFilter,
    sort?: ProductsSortOptions[],
    page?: PaginationOptions,
};

export type CreateProductDTO = {
    name: string,
    costOfGood: Price,
    markup: number,
    type: ProductType,
};

export type UpdateProductDTO = {
    _id: string,
    newName?: string,
    newCostOfGood?: Price,
    newMarkup?: number,
    newType?: ProductType,
};

export type UpdateProductsDTO = {
    filter: ProductsFilter,
    dateRange?: DateRangeFilter,
    sort?: ProductsSortOptions,
    page?: PaginationOptions,
    newName?: string,
    newCostOfGood?: Price,
    newMarkup?: number,
    newType?: ProductType,
};

export type DeleteProductDTO = { _id: string };

export type DeleteProductsDTO = {
    filter?: ProductsFilter,
    dateRange?: DateRangeFilter,
    sort?: ProductsSortOptions,
    page?: PaginationOptions,
};

export type ProductsFilter = {
    name?: string,
    nameRegex?: string,
    type?: ProductType,
    typeRegex?: string,
    costRange?: NumberRange,
    markupRange?: NumberRange,
};

export type ProductsSortOptions = {
    option: "name" | "type" | "cost" | "markup" | "dateCreated" | "lastUpdated",
    order: OrderOptions,
};
