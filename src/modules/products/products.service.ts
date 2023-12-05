import {Callback, HttpStatusCodes, Request, Response} from "@hals/core";
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
import {mapValidationErrorToResponse} from "../../shared/validate/validation-dtos.utility";
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
    GetProductDTO,
    GetProductsDTO,
    CreateProductDTO,
    UpdateProductDTO,
    UpdateProductsDTO,
    DeleteProductDTO,
    DeleteProductsDTO,
} from "./products-dtos.type";

const repository: ProductsRepository = PRODUCTS_REPOSITORY;

export const getProduct = (request: Request, done: Callback): void => {
    const dto: GetProductDTO = mapRequestToGetProductDTO(request);
    const validationOutcome: ValidationOutcome = validateGetProductDTO(dto);
    if (validationOutcome.error) {
        done(mapValidationErrorToResponse(validationOutcome))
        return;
    }

    const mapProductToResponseThenDone =
        (product: Product): void =>
            done(mapProductToResponse(product, HttpStatusCodes.OK));

    repository.getProduct(dto, mapProductToResponseThenDone);
};

export const getProducts = (request: Request, done: Callback): void => {
    const dto: GetProductsDTO = mapRequestToGetProductsDTO(request);
    const validationOutcome: ValidationOutcome = validateGetProductsDTO(dto);
    if (validationOutcome.error) {
        done(mapValidationErrorToResponse(validationOutcome))
        return;
    }

    const addPageData = (response: Response) =>
        addRequestPageDataToResponse(request, response);

    const mapProductsToResponseThenDone =
        (products: Product[]): void =>
            done(addPageData(mapProductsToResponse(products, HttpStatusCodes.OK)));

    repository.getProducts(dto, mapProductsToResponseThenDone);
};

export const createProduct = (request: Request, done: Callback): void => {
    const dto: CreateProductDTO = mapRequestToCreateProductDTO(request);
    const validationOutcome: ValidationOutcome = validateCreateProductDTO(dto);
    if (validationOutcome.error) {
        done(mapValidationErrorToResponse(validationOutcome))
        return;
    }

    const mapProductToResponseThenDone =
        (product: Product): void =>
            done(mapProductToResponse(product, HttpStatusCodes.CREATED));

    repository.createProduct(dto, mapProductToResponseThenDone);
};

export const updateProduct = (request: Request, done: Callback): void => {
    const dto: UpdateProductDTO = mapRequestToUpdateProductDTO(request);
    const validationOutcome: ValidationOutcome = validateUpdateProductDTO(dto);
    if (validationOutcome.error) {
        done(mapValidationErrorToResponse(validationOutcome))
        return;
    }

    const mapProductToResponseThenDone =
        (product: Product): void =>
            done(mapProductToResponse(product, HttpStatusCodes.OK));

    repository.updateProduct(dto, mapProductToResponseThenDone);
};

export const updateProducts = (request: Request, done: Callback): void => {
    const dto: UpdateProductsDTO = mapRequestToUpdateProductsDTO(request);
    const validationOutcome: ValidationOutcome = validateUpdateProductsDTO(dto);
    if (validationOutcome.error) {
        done(mapValidationErrorToResponse(validationOutcome))
        return;
    }

    const addPageData = (response: Response) =>
        addRequestPageDataToResponse(request, response);

    const mapProductsToResponseThenDone =
        (products: Product[]): void =>
            done(addPageData(mapProductsToResponse(products, HttpStatusCodes.OK)));

    repository.updateProducts(dto, mapProductsToResponseThenDone)
};

export const deleteProduct = (request: Request, done: Callback): void => {
    const dto: DeleteProductDTO = mapRequestToDeleteProductDTO(request);
    const validationOutcome: ValidationOutcome = validateDeleteProductDTO(dto);
    if (validationOutcome.error) {
        done(mapValidationErrorToResponse(validationOutcome))
        return;
    }

    const mapProductToResponseThenDone =
        (product: Product): void =>
            done(mapProductToResponse(product, HttpStatusCodes.OK));

    repository.deleteProduct(dto, mapProductToResponseThenDone);
};

export const deleteProducts = (request: Request, done: Callback): void => {
    const dto: DeleteProductsDTO = mapRequestToDeleteProductsDTO(request);
    const validationOutcome: ValidationOutcome = validateDeleteProductsDTO(dto);
    if (validationOutcome.error) {
        done(mapValidationErrorToResponse(validationOutcome))
        return;
    }

    const addPageData = (response: Response) =>
        addRequestPageDataToResponse(request, response);

    const mapProductsToResponseThenDone =
        (products: Product[]): void =>
            done(addPageData(mapProductsToResponse(products, HttpStatusCodes.OK)));

    repository.deleteProducts(dto, mapProductsToResponseThenDone)
};
