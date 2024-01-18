import { NumberRange, OrderOption, Page, Timestamps } from "@hals/common";

export type Product = {
   _id : string,
   name : string,
   costPrice : Price,
   markup : number,
   category : ProductCategory,
   imageUrl: string
};

export type Price = {
   price : number,
   currency : "ZAR" | "USD"
};

export type ProductCategory =
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
   category: ProductCategory,
   costPrice: Price,
   markup: number,
   imageUrl: string
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
   newCategory? : ProductCategory,
   newImageUrl?: string
};

export type DeleteProductRequest = { _id : string };

export type ProductsFilter = {
   name?: string,
   nameRegex?: string,
   category?: ProductCategory,
   categoryRegex?: string,
   costPriceRange?: NumberRange,
   markupRange?: NumberRange,
};

export type ProductsSortOption =
   | "name"
   | "category"
   | "costPrice"
   | "markup"
   | "createdAt"
   | "updatedAt";

export type ProductsSort = {
   field : ProductsSortOption,
   order: OrderOption,
};
