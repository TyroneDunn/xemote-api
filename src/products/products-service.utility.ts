import {HttpStatusCodes, Request, Response} from "@hals/core";
import {ProductsRepository} from "./products-repository.type";
import {ProductsDtoValidator} from "./products-dto-validator.utility";
import {Product} from "./product.type";
import {ValidationOutcome} from "../shared/validation-outcome/validation-outcome.type";
import {
    mapValidationOutcomeToErrorResponse
} from "../shared/validation-outcome/validation-outcome.utility";
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
import {CommandResult} from "../shared/command-result/command-result.type";
import {addRequestPageDataToResponse} from "../shared/hals/hals.utility";
import {
    mapDeleteResultToResponse,
    mapUpdateResultToResponse
} from "../shared/command-result/command-result.utility";
import {mapToInternalServerErrorResponse} from "../shared/errors/errors.utility";
import {ProductsService} from "./products-service.type";

export const configureProductsService = (
    repository: ProductsRepository,
    validator: ProductsDtoValidator): ProductsService =>
    ({
        getProduct: async (request: Request): Promise<Response> => {
            const dto: GetProductDTO = mapToGetProductDTO(request);
            const validationOutcome: ValidationOutcome = await validator.validateGetProductDTO(dto);
            if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

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
            if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

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
            if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);

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
            if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);

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
            if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);

            try {
                const result: CommandResult = await repository.updateProducts(dto);
                return mapUpdateResultToResponse(result);
            } catch (error) {
                return mapToInternalServerErrorResponse(error);
            }
        },

        deleteProduct: async (request: Request): Promise<Response> => {
            const dto: DeleteProductDTO = mapToDeleteProductDTO(request);
            const validationOutcome: ValidationOutcome = await validator.validateDeleteProductDTO(dto);
            if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);

            try {
                const result: CommandResult = await repository.deleteProduct(dto);
                return mapDeleteResultToResponse(result);
            } catch (error) {
                return mapToInternalServerErrorResponse(error);
            }
        },

        deleteProducts: async (request: Request): Promise<Response> => {
            const dto: ProductsDTO = mapRequestToProductsDTO(request);
            const validationOutcome: ValidationOutcome = await validator.validateProductsDTO(dto);
            if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);

            try {
                const result: CommandResult = await repository.deleteProducts(dto);
                return mapDeleteResultToResponse(result);
            } catch (error) {
                return mapToInternalServerErrorResponse(error);
            }
        },
    });