import {
    configureProductsDtoValidator,
    ProductsDtoValidator
} from "./products-dto-validator.utility";
import {configureProductsController, ProductsController} from "./products-controller.utility";
import {configureProductsService, ProductsService} from "./products.service";
import {ProductsRepository} from "./products-repository.type";
import {MongoProductsRepository} from "./mongo-products-repository.service";

const productsRepository: ProductsRepository = MongoProductsRepository;
const productsDtoValidator: ProductsDtoValidator = configureProductsDtoValidator(productsRepository);
const productsService: ProductsService = configureProductsService(productsRepository, productsDtoValidator);
const productsController: ProductsController = configureProductsController(productsService);

export default productsController;
