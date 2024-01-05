import {
   CreateProductRequest,
   DeleteProductRequest,
   GetProductRequest,
   Product,
   ProductsRequest,
   UpdateProductRequest,
   UpdateProductsRequest,
} from "./products.type";
import { CommandResult, Error } from "@hals/common";

export type ProductsRepository = {
   getProduct : (dto : GetProductRequest) => Promise<Product | Error>,
   getProducts : (dto : ProductsRequest) => Promise<Product[] | Error>,
   createProduct : (dto : CreateProductRequest) => Promise<Product | Error>,
   updateProduct : (dto : UpdateProductRequest) => Promise<Product | Error>,
   updateProducts : (dto : UpdateProductsRequest) => Promise<CommandResult | Error>,
   deleteProduct : (dto : DeleteProductRequest) => Promise<CommandResult | Error>,
   deleteProducts : (dto : ProductsRequest) => Promise<CommandResult | Error>,
   exists : (dto : GetProductRequest) => Promise<boolean | Error>,
};
