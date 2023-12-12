import {Controller, Method} from "@hals/core";
import {
    createProduct,
    deleteProduct,
    deleteProducts,
    getProduct,
    getProducts,
    updateProduct,
    updateProducts,
} from "./products.service";

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

const getProductsMethod: Method = {
    type: "GET",
    paramKeys: [],
    queryParamKeys: ProductsQueryParamKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: getProducts
};

const getProductMethod: Method = {
    type: "GET",
    paramKeys: ['id'],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: getProduct
};

const createProductMethod: Method = {
    type: "POST",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: createProduct
};

const updateProductsMethod: Method = {
    type: "PATCH",
    paramKeys: [],
    queryParamKeys: ProductsQueryParamKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: updateProducts
};

const updateProductMethod: Method = {
    type: "PATCH",
    paramKeys: ['id'],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: updateProduct
};

const deleteProductsMethod: Method = {
    type: "DELETE",
    paramKeys: [],
    queryParamKeys: ProductsQueryParamKeys,
    sideEffects: [],
    middleware: [],
    requestHandler: deleteProducts
};

const deleteProductMethod: Method = {
    type: "DELETE",
    paramKeys: ['id'],
    queryParamKeys: [],
    sideEffects: [],
    middleware: [],
    requestHandler: deleteProduct
};

export const ProductsController: Controller = {
    path: 'products/',
    guard: true,
    methods: [
        getProductsMethod,
        getProductMethod,
        createProductMethod,
        updateProductsMethod,
        updateProductMethod,
        deleteProductsMethod,
        deleteProductMethod,
    ]
};
