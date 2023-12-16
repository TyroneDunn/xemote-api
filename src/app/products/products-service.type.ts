import {Request, Response} from "@hals/core";

export type ProductsService = {
    getProduct: (request: Request) => Promise<Response>,
    getProducts: (request: Request) => Promise<Response>,
    createProduct: (request: Request) => Promise<Response>,
    updateProduct: (request: Request) => Promise<Response>,
    updateProducts: (request: Request) => Promise<Response>,
    deleteProduct: (request: Request) => Promise<Response>,
    deleteProducts: (request: Request) => Promise<Response>,
};
