import {ValidationOutcome} from "../../shared/validate/validation-dtos.type";
import {
    CreateProductDTO,
    DeleteProductDTO,
    ProductsDTO,
    GetProductDTO,
    UpdateProductDTO,
    UpdateProductsDTO,
} from "./products-dtos.type";
import {BadRequestError, NotFoundError} from "../../shared/errors.type";
import {ProductsRepository} from "./products-repository.type";
import {PRODUCTS_REPOSITORY} from "../../environment/repositories-config";

const repository: ProductsRepository = PRODUCTS_REPOSITORY;

export const validateGetProductDTO = async (dto: GetProductDTO): Promise<ValidationOutcome> => {
    if (!dto._id)
        return {error: new BadRequestError('Product ID  required.')};
    if (!(await repository.exists(dto)))
        return {error: new NotFoundError(`Product "${dto._id}" not found.`)};
    return {};
};

export const validateGetProductsDTO = async (dto: ProductsDTO): Promise<ValidationOutcome> => {
    return {};
};

export const validateCreateProductDTO = async (dto: CreateProductDTO): Promise<ValidationOutcome> => {
    return {};
};

export const validateUpdateProductDTO = async (dto: UpdateProductDTO): Promise<ValidationOutcome> => {
    return {};
};

export const validateUpdateProductsDTO = async (dto: UpdateProductsDTO): Promise<ValidationOutcome> => {
    return {};
};

export const validateDeleteProductDTO = async (dto: DeleteProductDTO): Promise<ValidationOutcome> => {
    return {};
};

export const validateDeleteProductsDTO = async (dto: ProductsDTO): Promise<ValidationOutcome> => {
    return {};
};
