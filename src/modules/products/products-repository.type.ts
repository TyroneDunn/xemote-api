import {Product} from "./product.type";
import {
    GetProductDTO,
    GetProductsDTO,
    CreateProductDTO,
    UpdateProductDTO,
    UpdateProductsDTO,
    DeleteProductDTO,
    DeleteProductsDTO
} from "./products-dtos.type";

export type ProductsRepository = {
    getProduct: (dto: GetProductDTO) => Promise<Product>,
    getProducts: (dto: GetProductsDTO) => Promise<Product[]>,
    createProduct: (dto: CreateProductDTO) => Promise<Product>,
    updateProduct: (dto: UpdateProductDTO) => Promise<Product>,
    updateProducts: (dto: UpdateProductsDTO) => Promise<Product[]>,
    deleteProduct: (dto: DeleteProductDTO) => Promise<Product>,
    deleteProducts: (dto: DeleteProductsDTO) => Promise<Product[]>,
    exists: (dto: GetProductDTO) => Promise<boolean>,
};
