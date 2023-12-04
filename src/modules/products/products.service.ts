import {Request, Response} from "@hals/core";
import {ProductsRepository} from "./products-repository.service";

const repository: ProductsRepository = PRODUCTS_REPOSITORY;

export const getProduct = async (dto: Request): Promise<Response> => {
    const response: Response = await validateGetProductDTO(dto);
    if (response.error) return response;
    return repository.getProduct(dto);
};

export const getProducts = async (dto: Request): Promise<Response> => {
    const response: Response = await validateGetProductsDTO(dto);
    if (response.error) return response;
    return repository.getProducts(dto);
};

export const createProduct = async (dto: Request): Promise<Response> => {
    const response: Response = await validateCreateProductDTO(dto);
    if (response.error) return response;
    return repository.createProduct(dto);
};

export const deleteProduct = async (dto: Request): Promise<Response> => {
    const response: Response = await validateDeleteProductDTO(dto);
    if (response.error) return response;
    return repository.deleteProduct(dto);
};

export const updateProduct = async (dto: Request): Promise<Response> => {
    const response: Response = await validateUpdateProductDTO(dto);
    if (response.error) return response;
    return repository.updateProduct(dto);
};
