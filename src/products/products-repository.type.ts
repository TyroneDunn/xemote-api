import {Product} from "./product.type";
import {
    CreateProductDTO,
    DeleteProductDTO,
    GetProductDTO,
    ProductsDTO,
    UpdateProductDTO,
    UpdateProductsDTO,
} from "./products-dtos.type";
import {CommandResult} from "../shared/command-result/command-result.type";

export type ProductsRepository = {
    getProduct: (dto: GetProductDTO) => Promise<Product>,
    getProducts: (dto: ProductsDTO) => Promise<Product[]>,
    createProduct: (dto: CreateProductDTO) => Promise<Product>,
    updateProduct: (dto: UpdateProductDTO) => Promise<Product>,
    updateProducts: (dto: UpdateProductsDTO) => Promise<CommandResult>,
    deleteProduct: (dto: DeleteProductDTO) => Promise<CommandResult>,
    deleteProducts: (dto: ProductsDTO) => Promise<CommandResult>,
    exists: (dto: GetProductDTO) => Promise<boolean>,
};
