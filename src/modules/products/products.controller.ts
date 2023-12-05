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
    'costRange',
    'markupRange',
    'dateRange',
    'sort',
    'page',
];

const getProductMethod: Method = {
    type: "GET",
    paramKeys: ['id'],
    queryParamKeys: [],
    sideEffects: [],
    done: getProduct
};

const getProductsMethod: Method = {
    type: "GET",
    paramKeys: [],
    queryParamKeys: ProductsQueryParamKeys,
    sideEffects: [],
    done: getProducts
};

const createProductMethod: Method = {
    type: "POST",
    paramKeys: [],
    queryParamKeys: [],
    sideEffects: [],
    done: createProduct
};

const updateProductMethod: Method = {
    type: "PATCH",
    paramKeys: ['id'],
    queryParamKeys: [],
    sideEffects: [],
    done: updateProduct
};

const updateProductsMethod: Method = {
    type: "PATCH",
    paramKeys: [],
    queryParamKeys: ProductsQueryParamKeys,
    sideEffects: [],
    done: updateProducts
};

const deleteProductMethod: Method = {
    type: "DELETE",
    paramKeys: ['id'],
    queryParamKeys: [],
    sideEffects: [],
    done: deleteProduct
};

const deleteProductsMethod: Method = {
    type: "DELETE",
    paramKeys: [],
    queryParamKeys: ProductsQueryParamKeys,
    sideEffects: [],
    done: deleteProducts
};

export const ProductsController: Controller = {
    path: 'products/',
    guard: true,
    methods: [
        getProductMethod,
        getProductsMethod,
        createProductMethod,
        updateProductMethod,
        updateProductsMethod,
        deleteProductMethod,
        deleteProductsMethod,
    ]
};
