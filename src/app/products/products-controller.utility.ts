import {Controller, Method, Request, Response} from "@hals/core";
import {ProductsService} from "./products-service.type";

export const ProductsQueryParamKeys: string[] = [
    'name',
    'nameRegex',
    'type',
    'typeRegex',
    'costPriceRange',
    'markupRange',
    'createdAt',
    'updatedAt',
    'sort',
    'order',
    'index',
    'limit'
];

const getProductsMethod = (getProducts: (request: Request) => Promise<Response>): Method => ({
    type: "GET",
    paramKeys: [],
    queryParamKeys: ProductsQueryParamKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: getProducts
});

const getProductMethod = (getProduct: (request: Request) => Promise<Response>): Method => ({
    type: "GET",
    paramKeys: ['id'],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: getProduct
});

const createProductMethod = (createProduct: (request: Request) => Promise<Response>): Method => ({
    type: "POST",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: createProduct
});

const updateProductsMethod = (updateProducts: (request: Request) => Promise<Response>): Method => ({
    type: "PATCH",
    paramKeys: [],
    queryParamKeys: ProductsQueryParamKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: updateProducts
});

const updateProductMethod = (updateProduct: (request: Request) => Promise<Response>): Method => ({
    type: "PATCH",
    paramKeys: ['id'],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: updateProduct
});

const deleteProductsMethod = (deleteProducts: (request: Request) => Promise<Response>): Method => ({
    type: "DELETE",
    paramKeys: [],
    queryParamKeys: ProductsQueryParamKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: deleteProducts
});

const deleteProductMethod = (deleteProduct: (request: Request) => Promise<Response>): Method => ({
    type: "DELETE",
    paramKeys: ['id'],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: deleteProduct
});

export type ProductsController = Controller;

export const configureProductsController = (service: ProductsService): Controller => ({
    path: 'products/',
    guard: true,
    methods: [
        getProductsMethod(service.getProducts),
        getProductMethod(service.getProducts),
        createProductMethod(service.createProduct),
        updateProductsMethod(service.updateProducts),
        updateProductMethod(service.updateProduct),
        deleteProductsMethod(service.deleteProducts),
        deleteProductMethod(service.deleteProduct),
    ]
});
