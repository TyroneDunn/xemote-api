import {
    CreateProductDTO,
    DeleteProductDTO,
    GetProductDTO,
    ProductsDTO,
    UpdateProductDTO,
    UpdateProductsDTO,
} from "./products-dtos.type";
import {ProductsRepository} from "./products-repository.type";
import {ValidationOutcome, Error} from "@hals/common";

export type ProductsDtoValidator = {
    validateGetProductDTO: (dto: GetProductDTO) => Promise<ValidationOutcome>,
    validateProductsDTO: (dto: ProductsDTO) => Promise<ValidationOutcome>,
    validateCreateProductDTO: (dto: CreateProductDTO) => Promise<ValidationOutcome>,
    validateUpdateProductDTO: (dto: UpdateProductDTO) => Promise<ValidationOutcome>,
    validateUpdateProductsDTO: (dto: UpdateProductsDTO) => Promise<ValidationOutcome>,
    validateDeleteProductDTO: (dto: DeleteProductDTO) => Promise<ValidationOutcome>,
};

export const configureProductsDtoValidator = (repository: ProductsRepository): ProductsDtoValidator => ({
    validateGetProductDTO: async (dto: GetProductDTO): Promise<ValidationOutcome> => {
        if (!dto._id)
            return {error: {type: "BadRequest", message: 'Product ID required.'}}
        if (!(await repository.exists(dto)))
            return {error: {type: "NotFound", message: `Product "${dto._id}" not found.`}}
        return {};
    },

    validateProductsDTO: async (dto: ProductsDTO): Promise<ValidationOutcome> => {
        return {};
    },

    validateCreateProductDTO: async (dto: CreateProductDTO): Promise<ValidationOutcome> => {
        return {};
    },

    validateUpdateProductDTO: async (dto: UpdateProductDTO): Promise<ValidationOutcome> => {
        return {};
    },

    validateUpdateProductsDTO: async (dto: UpdateProductsDTO): Promise<ValidationOutcome> => {
        return {};
    },

    validateDeleteProductDTO: async (dto: DeleteProductDTO): Promise<ValidationOutcome> => {
        return {};
    },
});
