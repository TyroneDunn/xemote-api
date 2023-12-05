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
    getProduct: (dto: GetProductDTO, done: (product: Product) => void) => void,
    getProducts: (dto: GetProductsDTO, done: (Products: Product[]) => void) => void,
    createProduct: (dto: CreateProductDTO, done: (product: Product) => void) => void,
    updateProduct: (dto: UpdateProductDTO, done: (product: Product) => void) => void,
    updateProducts: (dto: UpdateProductsDTO, done: (products: Product[]) => void) => void,
    deleteProduct: (dto: DeleteProductDTO, done: (product: Product) => void) => void,
    deleteProducts: (dto: DeleteProductsDTO, done: (products: Product[]) => void) => void,
    exists: (dto: GetProductDTO) => boolean,
};
