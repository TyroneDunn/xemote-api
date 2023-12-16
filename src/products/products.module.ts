import {
    configureProductsDtoValidator,
    ProductsDtoValidator
} from "./products-dto-validator.utility";
import {configureProductsController, ProductsController} from "./products-controller.utility";
import {configureProductsService} from "./products-service.utility";
import {ProductsRepository} from "./products-repository.type";
import {MongoProductsRepository} from "./mongo-products-repository.service";
import {ProductsService} from "./products-service.type";

const productsRepository: ProductsRepository = MongoProductsRepository;
const productsDtoValidator: ProductsDtoValidator = configureProductsDtoValidator(productsRepository);
const productsService: ProductsService = configureProductsService(productsRepository, productsDtoValidator);
const productsController: ProductsController = configureProductsController(productsService);

export default productsController;
