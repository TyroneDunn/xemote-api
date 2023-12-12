import {Product} from "./product.type";
import {
    GetProductDTO,
    ProductsDTO,
    CreateProductDTO,
    UpdateProductDTO,
    UpdateProductsDTO,
    DeleteProductDTO,
} from "./products-dtos.type";

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

export type Result = {
    success: boolean,
    affectedCount: number
};
