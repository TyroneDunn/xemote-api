import {Request, Response} from "@hals/core";
import {ProductsRepository} from "./products-repository.type";
import {
    validateGetProductDTO,
    validateGetProductsDTO,
    validateCreateProductDTO,
    validateUpdateProductDTO,
    validateDeleteProductDTO
} from "./products-dto-validator.service";
import {PRODUCTS_REPOSITORY} from "../../environment/repositories-config";

const repository: ProductsRepository = PRODUCTS_REPOSITORY;

export const getProduct = (dto: Request): Response => {
    const response: Response = validateGetProductDTO(dto);
    if (response.error) return response;
    return repository.getProduct(dto);
};

export const getProducts = (dto: Request): Response => {
    const response: Response = validateGetProductsDTO(dto);
    if (response.error) return response;
    return repository.getProducts(dto);
};

export const createProduct = (dto: Request): Response => {
    const response: Response = validateCreateProductDTO(dto);
    if (response.error) return response;
    return repository.createProduct(dto);
};

export const deleteProduct = (dto: Request): Response => {
    const response: Response = validateDeleteProductDTO(dto);
    if (response.error) return response;
    return repository.deleteProduct(dto);
};

export const updateProduct = (dto: Request): Response => {
    const response: Response = validateUpdateProductDTO(dto);
    if (response.error) return response;
    return repository.updateProduct(dto);
};
