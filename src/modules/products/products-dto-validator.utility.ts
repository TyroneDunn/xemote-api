import {ValidationOutcome} from "../../shared/validate/validation-dtos.type";
import {
    CreateProductDTO,
    DeleteProductDTO,
    DeleteProductsDTO,
    GetProductDTO,
    GetProductsDTO,
    UpdateProductDTO,
    UpdateProductsDTO,
} from "./products-dtos.type";

export const validateGetProductDTO = (dto: GetProductDTO): ValidationOutcome => {
    return undefined;
};

export const validateGetProductsDTO = (dto: GetProductsDTO): ValidationOutcome => {
    return undefined;
};

export const validateCreateProductDTO = (dto: CreateProductDTO): ValidationOutcome => {
    return undefined;
};

export const validateUpdateProductDTO = (dto: UpdateProductDTO): ValidationOutcome => {
    return undefined;
};

export const validateUpdateProductsDTO = (dto: UpdateProductsDTO): ValidationOutcome => {
    return undefined;
};

export const validateDeleteProductDTO = (dto: DeleteProductDTO): ValidationOutcome => {
    return undefined;
};

export const validateDeleteProductsDTO = (dto: DeleteProductsDTO): ValidationOutcome => {
    return undefined;
};
