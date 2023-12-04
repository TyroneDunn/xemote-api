import {Controller, Method} from "@hals/core";
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct
} from "./products.service";
import {ProductsQueryParamKeys} from "./product.type";

const getProductMethod: Method = {
    type: "GET",
    paramKeys: ['id'],
    queryParamKeys: [],
    sideEffects: [],
    callback: getProduct
};

const getProductsMethod: Method = {
    type: "GET",
    paramKeys: [],
    queryParamKeys: ProductsQueryParamKeys,
    sideEffects: [],
    callback: getProducts
};

const createProductMethod: Method = {
    type: "POST",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    callback: createProduct
};

const updateProductMethod: Method = {
    type: "PATCH",
    paramKeys: ['id'],
    queryParamKeys: [],
    sideEffects: [],
    callback: updateProduct
};

const deleteProductMethod: Method = {
    type: "DELETE",
    paramKeys: ['id'],
    queryParamKeys: [],
    sideEffects: [],
    callback: deleteProduct
};

export const ProductsController: Controller = {
    path: '/products/',
    guard: true,
    methods: [
        getProductMethod,
        getProductsMethod,
        createProductMethod,
        updateProductMethod,
        deleteProductMethod,
    ]
};
