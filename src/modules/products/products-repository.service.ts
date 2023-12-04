import {Request, Response} from "@hals/core"

export type ProductsRepository = {
    getProduct: (dto: Request) => Promise<Response>,
    getProducts: (dto: Request) => Promise<Response>,
    createProduct: (dto: Request) => Promise<Response>,
    deleteProduct: (dto: Request) => Promise<Response>,
    updateProduct: (dto: Request) => Promise<Response>,
    exists: (dto: Request) => Promise<boolean>,
};
