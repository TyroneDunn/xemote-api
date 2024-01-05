import { Price } from "./price.type";
import { NumberRange, OrderOption, Page, Timestamps } from "@hals/common";

export type Product = {
   _id : string,
   name : string,
   costPrice : Price,
   markup : number,
   type : ProductType,
};

export type ProductType =
   | "Xemote Gateway"
   | "Xemote Accessory"
   | "Wireless Temperature Sensor"
   | "Wireless Humidity Sensor"
   | "Wireless AC Current Meter"
   | "Wireless Event-Based Sensor"
   | "Wireless Infrared Beam Sensor"
   | "Wireless 4-30mA Sensor";

export type ProductsDTO = {
   filter?: ProductsFilter,
   timestamps?: Timestamps,
   sort?: ProductsSort,
   page?: Page,
};

export type GetProductDTO = { _id : string };

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
