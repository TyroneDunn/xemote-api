import {Product} from "./product.type";
import {Request, Response} from "@hals/core";

export const mapProductToResponse = (product: Product, status: number): Response =>
    ({
        status: status,
        collection: [product],
        count: 1,
    });

export const mapProductsToResponse = (products: Product[], status: number): Response => ({
    status: status,
    collection: [products],
    count: products.length,
});

export const addRequestPageDataToResponse = (request: Request, response: Response): Response =>
    ({
        ...response,
        index: parseInt(request.queryParamMap['index']),
        limit: parseInt(request.queryParamMap['limit']),
    });
