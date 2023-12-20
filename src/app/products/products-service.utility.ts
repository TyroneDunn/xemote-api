import {
   addRequestPageDataToResponse,
   CommandResult,
   Error,
   isError,
   mapDeleteResultToResponse,
   mapErrorToInternalServerErrorResponse,
   mapUpdateResultToResponse,
   mapValidationOutcomeToErrorResponse,
   Request,
   Response,
   ValidationOutcome,
} from "@hals/common";
import { ProductsRepository } from "./products-repository.type";
import { ProductsDtoValidator } from "./products-dto-validator.utility";
import { Product } from "./product.type";
import {
   mapProductsToSuccessResponse,
   mapProductToSuccessResponse,
   mapRequestToProductsDTO,
   mapToCreateProductDTO,
   mapToDeleteProductDTO,
   mapToGetProductDTO,
   mapToUpdateProductDTO,
   mapToUpdateProductsDTO,
} from "./products-dtos.utility";
import {
   CreateProductDTO,
   DeleteProductDTO,
   GetProductDTO,
   ProductsDTO,
   UpdateProductDTO,
   UpdateProductsDTO,
} from "./products-dtos.type";
import { ProductsService } from "./products-service.type";
import { InventoryRepository } from "../inventory/inventory-repository.type";

export const configureProductsService = (
   repository: ProductsRepository,
   validator: ProductsDtoValidator,
   inventoryRepository: InventoryRepository): ProductsService =>
   ({
      getProduct: async (request: Request): Promise<Response> => {
         const dto: GetProductDTO = mapToGetProductDTO(request);
         const validationOutcome: ValidationOutcome = await validator.validateGetProductDTO(dto);
         if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result: Product | Error = await repository.getProduct(dto);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         return mapProductToSuccessResponse(result);
      },

      getProducts: async (request: Request): Promise<Response> => {
         const dto: ProductsDTO = mapRequestToProductsDTO(request);
         const validationOutcome: ValidationOutcome = await validator.validateProductsDTO(dto);
         if (validationOutcome.error !== undefined) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result: Product[] | Error = await repository.getProducts(dto);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         const addPageData = (response: Response): Response =>
            addRequestPageDataToResponse(request, response);
         return addPageData(mapProductsToSuccessResponse(result));
      },

      createProduct: async (request: Request): Promise<Response> => {
         const dto: CreateProductDTO = mapToCreateProductDTO(request);
         const validationOutcome: ValidationOutcome = await validator.validateCreateProductDTO(dto);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result: Product | Error = await repository.createProduct(dto);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         // todo improve inventory repository error handling
         await inventoryRepository.createRecord({ productId: result._id, count: 0 });
         return mapProductToSuccessResponse(result);
      },

      updateProduct: async (request: Request): Promise<Response> => {
         const dto: UpdateProductDTO = mapToUpdateProductDTO(request);
         const validationOutcome: ValidationOutcome = await validator.validateUpdateProductDTO(dto);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);
         const result: Product | Error = await repository.updateProduct(dto);
         if (isError(result)) return mapErrorToInternalServerErrorResponse(result);
         return mapProductToSuccessResponse(result);
      },

      updateProducts: async (request: Request): Promise<Response> => {
         const dto: UpdateProductsDTO = mapToUpdateProductsDTO(request);
         const validationOutcome: ValidationOutcome = await validator.validateUpdateProductsDTO(dto);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);

         try {
            const result: CommandResult = await repository.updateProducts(dto);
            return mapUpdateResultToResponse(result);
         }
         catch (error) {
            return mapErrorToInternalServerErrorResponse(error);
         }
      },

      deleteProduct: async (request: Request): Promise<Response> => {
         const dto: DeleteProductDTO = mapToDeleteProductDTO(request);
         const validationOutcome: ValidationOutcome = await validator.validateDeleteProductDTO(dto);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);

         try {
            const result: CommandResult = await repository.deleteProduct(dto);
            await inventoryRepository.deleteRecord({ productId: dto._id });
            return mapDeleteResultToResponse(result);
         }
         catch (error) {
            return mapErrorToInternalServerErrorResponse(error);
         }
      },

      deleteProducts: async (request: Request): Promise<Response> => {
         const dto: ProductsDTO = mapRequestToProductsDTO(request);
         const validationOutcome: ValidationOutcome = await validator.validateProductsDTO(dto);
         if (validationOutcome.error) return mapValidationOutcomeToErrorResponse(validationOutcome);

         try {
            const products: Product[] = await repository.getProducts(dto);
            products.forEach(async (product) => {
               await inventoryRepository.deleteRecord({ productId: product._id });
            });
            const result: CommandResult = await repository.deleteProducts(dto);
            return mapDeleteResultToResponse(result);
         }
         catch (error) {
            return mapErrorToInternalServerErrorResponse(error);
         }
      },
   });
