import {
    configureProductsDtoValidator,
    ProductsDtoValidator
} from "./products-dto-validator.utility";
import {configureProductsController, ProductsController} from "./products-controller.utility";
import {configureProductsService, ProductsService} from "./products.service";
import {ProductsRepository} from "./products-repository.type";
import {PRODUCTS_REPOSITORY} from "../repositories.config";

const productsRepository: ProductsRepository = PRODUCTS_REPOSITORY;
const productsDtoValidator: ProductsDtoValidator = configureProductsDtoValidator(productsRepository);
const productsService: ProductsService = configureProductsService(productsRepository, productsDtoValidator);
const productsController: ProductsController = configureProductsController(productsService);

export default productsController;
