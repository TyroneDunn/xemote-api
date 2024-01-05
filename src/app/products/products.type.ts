import { NumberRange, OrderOption, Page, Timestamps } from "@hals/common";

export type Product = {
   _id : string,
   name : string,
   costPrice : Price,
   markup : number,
   type : ProductType,
};

export type Price = {
   price : number,
   currency : "ZAR" | "USD"
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

export type ProductsRequest = {
   filter?: ProductsFilter,
   timestamps?: Timestamps,
   sort?: ProductsSort,
   page?: Page,
};

export type GetProductRequest = { _id : string };

export type CreateProductRequest = {
   name: string,
   type: ProductType,
   costPrice: Price,
   markup: number,
};

export type UpdateProductRequest = {
   _id: string,
   updateFields: ProductUpdateFields,
};

export type UpdateProductsRequest = {
   filter: ProductsFilter,
   timestamps?: Timestamps,
   updateFields: ProductUpdateFields,
};

export type ProductUpdateFields = {
   newName? : string,
   newCostPrice? : Price,
   newMarkup? : number,
   newType? : ProductType,
}

export type DeleteProductRequest = { _id : string };

export type ProductsFilter = {
   name?: string,
   nameRegex?: string,
   type?: ProductType,
   typeRegex?: string,
   costPriceRange?: NumberRange,
   markupRange?: NumberRange,
};

export type ProductsSortOption =
   | "name"
   | "type"
   | "costPrice"
   | "markup"
   | "createdAt"
   | "updatedAt";

export type ProductsSort = {
   field : ProductsSortOption,
   order: OrderOption,
};
