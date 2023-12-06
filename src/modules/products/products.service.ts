import {HttpStatusCodes, Request, Response} from "@hals/core";
import {ProductsRepository} from "./products-repository.type";
import {PRODUCTS_REPOSITORY} from "../../environment/repositories-config";
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
import {ValidationOutcome} from "../../shared/validate/validation-dtos.type";
import {mapToErrorResponse} from "../../shared/validate/validation-dtos.utility";
import {
    addRequestPageDataToResponse,
    mapProductsToResponse,
    mapProductToResponse,
    mapRequestToCreateProductDTO,
    mapRequestToDeleteProductDTO,
    mapRequestToDeleteProductsDTO,
    mapRequestToGetProductDTO,
    mapRequestToGetProductsDTO,
    mapRequestToUpdateProductDTO,
    mapRequestToUpdateProductsDTO
} from "./products-dtos.utility";
import {
    CreateProductDTO,
    DeleteProductDTO,
    DeleteProductsDTO,
    GetProductDTO,
    GetProductsDTO,
    UpdateProductDTO,
    UpdateProductsDTO,
} from "./products-dtos.type";

const repository: ProductsRepository = PRODUCTS_REPOSITORY;

export const getProduct = async (request: Request): Promise<Response> => {
    const dto: GetProductDTO = mapRequestToGetProductDTO(request);

    const validationOutcome: ValidationOutcome = await validateGetProductDTO(dto);
    if (validationOutcome.error) return mapToErrorResponse(validationOutcome);

    try {
        const product: Product = await repository.getProduct(dto);
        return mapProductToResponse(product, HttpStatusCodes.OK);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

const mapToInternalServerErrorResponse = (error): Response => ({
    status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    error: error.message,
});

export const getProducts = async (request: Request): Promise<Response> => {
    const dto: GetProductsDTO = mapRequestToGetProductsDTO(request);

    const validationOutcome: ValidationOutcome = await validateGetProductsDTO(dto);
    if (validationOutcome.error) return mapToErrorResponse(validationOutcome);

    try {
        const products: Product[] = await repository.getProducts(dto);
        const addPageData = (response: Response): Response =>
            addRequestPageDataToResponse(request, response);
        return addPageData(mapProductsToResponse(products, HttpStatusCodes.OK));
    } catch (error) {
        return mapToInternalServerErrorResponse(error)
    }
};

export const createProduct = async (request: Request): Promise<Response> => {
    const dto: CreateProductDTO = mapRequestToCreateProductDTO(request);

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
    const dto: UpdateProductDTO = mapRequestToUpdateProductDTO(request);

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
    const dto: UpdateProductsDTO = mapRequestToUpdateProductsDTO(request);

    const validationOutcome: ValidationOutcome = await validateUpdateProductsDTO(dto);
    if (validationOutcome.error) return mapToErrorResponse(validationOutcome);

    const addPageData = (response: Response) =>
        addRequestPageDataToResponse(request, response);

    try {
        const products: Product[] = await repository.updateProducts(dto);
        return addPageData(mapProductsToResponse(products, HttpStatusCodes.OK));
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const deleteProduct = async (request: Request): Promise<Response> => {
    const dto: DeleteProductDTO = mapRequestToDeleteProductDTO(request);

    const validationOutcome: ValidationOutcome = await validateDeleteProductDTO(dto);
    if (validationOutcome.error) return mapToErrorResponse(validationOutcome);

    try {
        const product: Product = await repository.deleteProduct(dto);
        return mapProductToResponse(product, HttpStatusCodes.OK);
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};

export const deleteProducts = async (request: Request): Promise<Response> => {
    const dto: DeleteProductsDTO = mapRequestToDeleteProductsDTO(request);
    const validationOutcome: ValidationOutcome = await validateDeleteProductsDTO(dto);
    if (validationOutcome.error) return mapToErrorResponse(validationOutcome);

    const addPageData = (response: Response) =>
        addRequestPageDataToResponse(request, response);

    try {
        const products: Product[] = await repository.deleteProducts(dto);
        return addPageData(mapProductsToResponse(products, HttpStatusCodes.OK));
    } catch (error) {
        return mapToInternalServerErrorResponse(error);
    }
};
