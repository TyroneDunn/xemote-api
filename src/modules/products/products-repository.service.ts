import {Product} from "./product.type";
import {Request} from "@hals/core"
import {Response} from "../../shared/response-dto.type";

export type ProductsRepository = {
    getProduct: (dto: Request) => Promise<Response<Product>>,
    getProducts: (dto: Request) => Promise<Response<Product>>,
    createProduct: (dto: Request) => Promise<Response<Product>>,
    deleteProduct: (dto: Request) => Promise<Response<Product>>,
    updateProduct: (dto: Request) => Promise<Response<Product>>,
    exists: (dto: Request) => Promise<boolean>,
};
