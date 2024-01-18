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
import { GetRecordsResponse } from '../../shared/get-records-response.type';

export type ProductsRepository = {
   getProduct : GetProduct,
   getProducts : GetProducts,
   createProduct : CreateProduct,
   updateProduct : UpdateProduct,
   updateProducts : UpdateProducts,
   deleteProduct : DeleteProduct,
   deleteProducts : DeleteProducts,
   exists : (dto : GetProductRequest) => Promise<boolean | Error>,
};

export type GetProduct = (request : GetProductRequest) => Promise<Product | Error>;
export type GetProducts = (request : ProductsRequest) => Promise<GetRecordsResponse<Product> | Error>;
export type CreateProduct = (request : CreateProductRequest) => Promise<Product | Error>;
export type UpdateProduct = (request : UpdateProductRequest) => Promise<Product | Error>;
export type UpdateProducts = (request : UpdateProductsRequest) => Promise<CommandResult | Error>;
export type DeleteProduct = (request : DeleteProductRequest) => Promise<CommandResult | Error>;
export type DeleteProducts = (request : ProductsRequest) => Promise<CommandResult | Error>;
