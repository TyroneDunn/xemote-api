import {ProductType} from "./product.type";
import {Pagination} from "../../shared/pagination.type";
import {Price} from "../../shared/price.type";
import {NumberRange} from "../../shared/number-range.type";
import {OrderOptions} from "../../shared/order-options.type";
import {Timestamps} from "../../shared/timestamps.type";

export type GetProductDTO = { _id: string };

export type GetProductsDTO = {
    filter?: ProductsFilter,
    timestamps?: Timestamps,
    sort?: ProductsSort,
    page?: Pagination,
};

export type CreateProductDTO = {
    name: string,
    costPrice: Price,
    markup: number,
    type: ProductType,
};

export type UpdateProductFields = {
    newName?: string,
    newCostOfGood?: Price,
    newMarkup?: number,
    newType?: ProductType,
}

export type UpdateProductDTO = {
    _id: string,
    updateFields: UpdateProductFields,
};

export type UpdateProductsDTO = {
    filter: ProductsFilter,
    timestamps?: Timestamps,
    sort?: ProductsSort,
    page?: Pagination,
    updateFields: UpdateProductFields,
};

export type DeleteProductDTO = { _id: string };

export type DeleteProductsDTO = {
    filter?: ProductsFilter,
    timestamps?: Timestamps,
    sort?: ProductsSort,
    page?: Pagination,
};

export type ProductsFilter = {
    name?: string,
    nameRegex?: string,
    type?: ProductType,
    typeRegex?: string,
    costPriceRange?: NumberRange,
    markupRange?: NumberRange,
};

export type ProductsSortOptions = "name" | "type" | "costPrice" | "markup" | "dateCreated" | "lastUpdated";

export type ProductsSort = {
    field: ProductsSortOptions,
    order: OrderOptions,
};
