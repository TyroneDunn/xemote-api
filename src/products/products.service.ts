import {HttpStatusCodes, Request, Response} from "@hals/core";
import {ProductsRepository} from "./products-repository.type";
import {ProductsDtoValidator} from "./products-dto-validator.utility";
import {Product} from "./product.type";
import {ValidationOutcome} from "../shared/validation-dtos.type";
import {mapToErrorResponse} from "../shared/validation-dtos.utility";
import {
    mapProductsToResponse,
    mapProductToSuccessResponse,
    mapRequestToProductsDTO,
    mapToCreateProductDTO,
    mapToDeleteProductDTO,
    mapToGetProductDTO,
    mapToUpdateProductDTO,
    mapToUpdateProductsDTO
} from "./products-dtos.utility";
import {
    CreateProductDTO,
    DeleteProductDTO,
    GetProductDTO,
    ProductsDTO,
    UpdateProductDTO,
    UpdateProductsDTO,
} from "./products-dtos.type";
import {Result} from "../shared/result.type";
import {
    addRequestPageDataToResponse,
    mapToInternalServerErrorResponse
} from "../shared/hals.utility";

export type ProductsService = {
    getProduct: (request: Request) => Promise<Response>,
    getProducts: (request: Request) => Promise<Response>,
    createProduct: (request: Request) => Promise<Response>,
    updateProduct: (request: Request) => Promise<Response>,
    updateProducts: (request: Request) => Promise<Response>,
    deleteProduct: (request: Request) => Promise<Response>,
    deleteProducts: (request: Request) => Promise<Response>,
};

export const configureProductsService = (
    repository: ProductsRepository,
    validator: ProductsDtoValidator): ProductsService =>
    ({
        getProduct: async (request: Request): Promise<Response> => {
            const dto: GetProductDTO = mapToGetProductDTO(request);
            const validationOutcome: ValidationOutcome = await validator.validateGetProductDTO(dto);
            if (validationOutcome.error !== undefined) return mapToErrorResponse(validationOutcome);

            try {
                const product: Product = await repository.getProduct(dto);
                return mapProductToSuccessResponse(product);
            } catch (error) {
                return mapToInternalServerErrorResponse(error);
            }
        },

        getProducts: async (request: Request): Promise<Response> => {
            const dto: ProductsDTO = mapRequestToProductsDTO(request);
            const validationOutcome: ValidationOutcome = await validator.validateProductsDTO(dto);
            if (validationOutcome.error !== undefined) return mapToErrorResponse(validationOutcome);

            try {
                const products: Product[] = await repository.getProducts(dto);
                const addPageData = (response: Response): Response =>
                    addRequestPageDataToResponse(request, response);
                return addPageData(mapProductsToResponse(products, HttpStatusCodes.OK));
            } catch (error) {
                return mapToInternalServerErrorResponse(error);
            }
        },

        createProduct: async (request: Request): Promise<Response> => {
            const dto: CreateProductDTO = mapToCreateProductDTO(request);
            const validationOutcome: ValidationOutcome = await validator.validateCreateProductDTO(dto);
            if (validationOutcome.error) return mapToErrorResponse(validationOutcome);

            try {
                const product: Product = await repository.createProduct(dto);
                return mapProductToSuccessResponse(product);
            } catch (error) {
                return mapToInternalServerErrorResponse(error);
            }
        },

        updateProduct: async (request: Request): Promise<Response> => {
            const dto: UpdateProductDTO = mapToUpdateProductDTO(request);
            const validationOutcome: ValidationOutcome = await validator.validateUpdateProductDTO(dto);
            if (validationOutcome.error) return mapToErrorResponse(validationOutcome);

            try {
                const product: Product = await repository.updateProduct(dto);
                return mapProductToSuccessResponse(product);
            } catch (error) {
                return mapToInternalServerErrorResponse(error);
            }
        },

        updateProducts: async (request: Request): Promise<Response> => {
            const dto: UpdateProductsDTO = mapToUpdateProductsDTO(request);
            const validationOutcome: ValidationOutcome = await validator.validateUpdateProductsDTO(dto);
            if (validationOutcome.error) return mapToErrorResponse(validationOutcome);

            try {
                const result: Result = await repository.updateProducts(dto);
                return mapUpdateResultToResponse(result);
            } catch (error) {
                return mapToInternalServerErrorResponse(error);
            }
        },

        deleteProduct: async (request: Request): Promise<Response> => {
            const dto: DeleteProductDTO = mapToDeleteProductDTO(request);
            const validationOutcome: ValidationOutcome = await validator.validateDeleteProductDTO(dto);
            if (validationOutcome.error) return mapToErrorResponse(validationOutcome);

            try {
                const result: Result = await repository.deleteProduct(dto);
                return mapDeleteResultToResponse(result);
            } catch (error) {
                return mapToInternalServerErrorResponse(error);
            }
        },

        deleteProducts: async (request: Request): Promise<Response> => {
            const dto: ProductsDTO = mapRequestToProductsDTO(request);
            const validationOutcome: ValidationOutcome = await validator.validateProductsDTO(dto);
            if (validationOutcome.error) return mapToErrorResponse(validationOutcome);

            try {
                const result: Result = await repository.deleteProducts(dto);
                return mapDeleteResultToResponse(result);
            } catch (error) {
                return mapToInternalServerErrorResponse(error);
            }
        },
    });

const mapUpdateResultToResponse = (result: Result): Response => ({
    status: result.success ? HttpStatusCodes.OK : HttpStatusCodes.INTERNAL_SERVER_ERROR,
    ...result.success && {count: result.affectedCount},
    ...(!result.success) && {error: 'Error updating products.'}
});

const mapDeleteResultToResponse = (result: Result): Response => ({
    status: result.success && result.affectedCount > 0
        ? HttpStatusCodes.OK
        : result.success && result.affectedCount === 0
            ? HttpStatusCodes.NOT_FOUND
            : HttpStatusCodes.INTERNAL_SERVER_ERROR,
    ...result.success && {count: result.affectedCount},
    ...(!result.success) && {error: 'Error deleting product(s).'}
});
