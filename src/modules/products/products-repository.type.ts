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
    updateProducts: (dto: UpdateProductsDTO) => Promise<Product[]>,
    deleteProduct: (dto: DeleteProductDTO) => Promise<Product>,
    deleteProducts: (dto: ProductsDTO) => Promise<Product[]>,
    exists: (dto: GetProductDTO) => Promise<boolean>,
};
