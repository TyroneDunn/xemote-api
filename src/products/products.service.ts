import {HttpStatusCodes, Request, Response} from "@hals/core";
import {ProductsRepository, Result} from "./products-repository.type";
import {PRODUCTS_REPOSITORY} from "../environment/repositories-config";
import {
    validateCreateProductDTO,
    validateDeleteProductDTO,
    validateDeleteProductsDTO,
    validateGetProductDTO,
    validateGetProductsDTO,
    validateUpdateProductDTO,
    validateUpdateProductsDTO
} from "./products-dto-validator.utility";
import {Product} from "./product.type";
import {ValidationOutcome} from "../shared/validate/validation-dtos.type";
import {mapToErrorResponse} from "../shared/validate/validation-dtos.utility";
import {
    addRequestPageDataToResponse,
    mapProductsToResponse,
    mapProductToResponse,
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

const repository: ProductsRepository = PRODUCTS_REPOSITORY;

export const getProduct = async (request: Request): Promise<Response> => {
    const dto: GetProductDTO = mapToGetProductDTO(request);

    const validationOutcome: ValidationOutcome = await validateGetProductDTO(dto);
    if (validationOutcome.error !== undefined) return mapToErrorResponse(validationOutcome);

    try {
        const product: Product = await repository.getProduct(dto);
        return mapProductToResponse(product, HttpStatusCodes.OK);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const getProducts = async (request: Request): Promise<Response> => {
    const dto: ProductsDTO = mapRequestToProductsDTO(request);

    const validationOutcome: ValidationOutcome = await validateGetProductsDTO(dto);
    if (validationOutcome.error !== undefined) return mapToErrorResponse(validationOutcome);
    try {
        const products: Product[] = await repository.getProducts(dto);
        const addPageData = (response: Response): Response =>
            addRequestPageDataToResponse(request, response);
        return addPageData(mapProductsToResponse(products, HttpStatusCodes.OK));
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const createProduct = async (request: Request): Promise<Response> => {
    const dto: CreateProductDTO = mapToCreateProductDTO(request);

    const validationOutcome: ValidationOutcome = await validateCreateProductDTO(dto);
    if (validationOutcome.error) return mapToErrorResponse(validationOutcome);

    try {
        const product: Product = await repository.createProduct(dto);
        return mapProductToResponse(product, HttpStatusCodes.CREATED);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const updateProduct = async (request: Request): Promise<Response> => {
    const dto: UpdateProductDTO = mapToUpdateProductDTO(request);

    const validationOutcome: ValidationOutcome = await validateUpdateProductDTO(dto);
    if (validationOutcome.error) return mapToErrorResponse(validationOutcome);

    try {
        const product: Product = await repository.updateProduct(dto);
        return mapProductToResponse(product, HttpStatusCodes.OK);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const updateProducts = async (request: Request): Promise<Response> => {
    const dto: UpdateProductsDTO = mapToUpdateProductsDTO(request);

    const validationOutcome: ValidationOutcome = await validateUpdateProductsDTO(dto);
    if (validationOutcome.error) return mapToErrorResponse(validationOutcome);

    try {
        const result: Result = await repository.updateProducts(dto);
        return mapUpdateResultToResponse(result);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const deleteProduct = async (request: Request): Promise<Response> => {
    const dto: DeleteProductDTO = mapToDeleteProductDTO(request);

    const validationOutcome: ValidationOutcome = await validateDeleteProductDTO(dto);
    if (validationOutcome.error) return mapToErrorResponse(validationOutcome);

    try {
        const result: Result = await repository.deleteProduct(dto);
        return mapDeleteResultToResponse(result);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const deleteProducts = async (request: Request): Promise<Response> => {
    const dto: ProductsDTO = mapRequestToProductsDTO(request);
    const validationOutcome: ValidationOutcome = await validateDeleteProductsDTO(dto);
    if (validationOutcome.error) return mapToErrorResponse(validationOutcome);

    try {
        const result: Result = await repository.deleteProducts(dto);
        return mapDeleteResultToResponse(result);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

const mapToInternalServerErrorResponse = (error): Response => ({
    status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    error: error.message,
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
