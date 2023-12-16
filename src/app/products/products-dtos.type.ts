import {ProductType} from "./product.type";
import {Price} from "./price.type";
import {Page} from "../../shared/page/page.type";
import {NumberRange} from "../../shared/number-range/number-range.type";
import {OrderOption} from "../../shared/sort/order-option.type";
import {Timestamps} from "../../shared/timestamps/timestamps.type";

export type GetProductDTO = { _id: string };

export type ProductsDTO = {
    filter?: ProductsFilter,
    timestamps?: Timestamps,
    sort?: ProductsSort,
    page?: Page,
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
    order: OrderOption,
};
