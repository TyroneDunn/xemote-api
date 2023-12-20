import { Product } from "./product.type";
import {
   CreateProductDTO,
   DeleteProductDTO,
   GetProductDTO,
   ProductsDTO,
   UpdateProductDTO,
   UpdateProductsDTO,
} from "./products-dtos.type";
import { CommandResult, Error } from "@hals/common";

export type ProductsRepository = {
   getProduct: (dto: GetProductDTO) => Promise<Product | Error>,
   getProducts: (dto: ProductsDTO) => Promise<Product[] | Error>,
   createProduct: (dto: CreateProductDTO) => Promise<Product | Error>,
   updateProduct: (dto: UpdateProductDTO) => Promise<Product | Error>,
   updateProducts: (dto: UpdateProductsDTO) => Promise<CommandResult | Error>,
   deleteProduct: (dto: DeleteProductDTO) => Promise<CommandResult | Error>,
   deleteProducts: (dto: ProductsDTO) => Promise<CommandResult | Error>,
   exists: (dto: GetProductDTO) => Promise<boolean | Error>,
};
