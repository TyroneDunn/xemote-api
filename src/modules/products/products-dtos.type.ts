import {ProductType} from "./product.type";
import {Pagination} from "../../shared/pagination.type";
import {Price} from "../../shared/price.type";
import {NumberRange} from "../../shared/number-range.type";
import {OrderOptions} from "../../shared/order-options.type";
import {Timestamps} from "../../shared/timestamps.type";

export type GetProductDTO = { _id: string };

export type ProductsDTO = {
    filter?: ProductsFilter,
    timestamps?: Timestamps,
    sort?: ProductsSort,
    page?: Pagination,
};

export type CreateProductDTO = {
    name: string,
    type: ProductType,
    costPrice: Price,
    markup: number,
};

export type ProductUpdateFields = {
    newName?: string,
    newCostPrice?: Price,
    newMarkup?: number,
    newType?: ProductType,
}

export type UpdateProductDTO = {
    _id: string,
    updateFields: ProductUpdateFields,
};

export type UpdateProductsDTO = {
    filter: ProductsFilter,
    timestamps?: Timestamps,
    updateFields: ProductUpdateFields,
};

export type DeleteProductDTO = { _id: string };

export type ProductsFilter = {
    name?: string,
    nameRegex?: string,
    type?: ProductType,
    typeRegex?: string,
    costPriceRange?: NumberRange,
    markupRange?: NumberRange,
};

export type ProductsSortOptions =
    | "name"
    | "type"
    | "costPrice"
    | "markup"
    | "createdAt"
    | "updatedAt";

export type ProductsSort = {
    field: ProductsSortOptions,
    order: OrderOptions,
};
