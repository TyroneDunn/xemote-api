import {HttpStatusCodes, Request, Response} from "@hals/core";
import {ProductsRepository} from "./products-repository.type";
import {ProductsDtoValidator} from "./products-dto-validator.utility";
import {Product} from "./product.type";
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
import {ProductsService} from "./products-service.type";
import {
    addRequestPageDataToResponse, CommandResult, mapDeleteResultToResponse,
    mapErrorToInternalServerErrorResponse, mapUpdateResultToResponse,
    mapValidationOutcomeToErrorResponse,
    ValidationOutcome
} from "@hals/common";
import {InventoryService} from "../inventory/inventory-service.type";
import {InventoryRepository} from "../inventory/inventory-repository.type";

export const configureProductsService = (
    repository: ProductsRepository,
    validator: ProductsDtoValidator,
    inventoryRepository: InventoryRepository): ProductsService =>
    ({
        getProduct: async (request: Request): Promise<Response> => {
            const dto: GetProductDTO = mapToGetProductDTO(request);
            const validationOutcome: ValidationOutcome = await validator.validateGetProductDTO(dto);
            if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);

            try {
                const product: Product = await repository.getProduct(dto);
                return mapProductToSuccessResponse(product);
            } catch (error) {
                return mapErrorToInternalServerErrorResponse(error);
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
                return mapErrorToInternalServerErrorResponse(error);
            }
        },

        createProduct: async (request: Request): Promise<Response> => {
            const dto: CreateProductDTO = mapToCreateProductDTO(request);
            const validationOutcome: ValidationOutcome = await validator.validateCreateProductDTO(dto);
            if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);

            try {
                const product: Product = await repository.createProduct(dto);
                await inventoryRepository.createRecord({productId: product._id, count: 0});
                return mapProductToSuccessResponse(product);
            } catch (error) {
                return mapErrorToInternalServerErrorResponse(error);
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
                return mapErrorToInternalServerErrorResponse(error);
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
                return mapErrorToInternalServerErrorResponse(error);
            }
        },

        deleteProduct: async (request: Request): Promise<Response> => {
            const dto: DeleteProductDTO = mapToDeleteProductDTO(request);
            const validationOutcome: ValidationOutcome = await validator.validateDeleteProductDTO(dto);
            if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);

            try {
                const result: CommandResult = await repository.deleteProduct(dto);
                await inventoryRepository.deleteRecord({productId: dto._id});
                return mapDeleteResultToResponse(result);
            } catch (error) {
                return mapErrorToInternalServerErrorResponse(error);
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
                return mapErrorToInternalServerErrorResponse(error);
            }
        },
    });
