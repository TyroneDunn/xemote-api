import {Product} from "./product.type";
import {
    CreateProductDTO,
    DeleteProductDTO,
    GetProductDTO,
    ProductsDTO,
    UpdateProductDTO,
    UpdateProductsDTO,
} from "./products-dtos.type";
import {Result} from "../shared/result.type";

export type ProductsRepository = {
    getProduct: (dto: GetProductDTO) => Promise<Product>,
    getProducts: (dto: ProductsDTO) => Promise<Product[]>,
    createProduct: (dto: CreateProductDTO) => Promise<Product>,
    updateProduct: (dto: UpdateProductDTO) => Promise<Product>,
    updateProducts: (dto: UpdateProductsDTO) => Promise<Result>,
    deleteProduct: (dto: DeleteProductDTO) => Promise<Result>,
    deleteProducts: (dto: ProductsDTO) => Promise<Result>,
    exists: (dto: GetProductDTO) => Promise<boolean>,
};
