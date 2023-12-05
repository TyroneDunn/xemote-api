// todo: remove hals dependency for pure logic
import {Request} from "@hals/core"
import {Product} from "./product.type";

export type ProductsRepository = {
    getProduct: (dto: Request, done: (product: Product) => void) => void,
    getProducts: (dto: Request, done: (Products: Product[]) => void) => void,
    createProduct: (dto: Request, done: (product: Product) => void) => void,
    deleteProduct: (dto: Request, done: (product: Product) => void) => void,
    updateProduct: (dto: Request, done: (product: Product) => void) => void,
    exists: (dto: Request) => boolean,
};
