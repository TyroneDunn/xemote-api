import {UsersRepository} from "../modules/users/users-repository.type";
import {ProductsRepository} from "../modules/products/products-repository.type";
import {MongoUsersRepository} from "../modules/users/mongo-users-repository.service";
import {MongoProductsRepository} from "../modules/products/mongo-products-repository.service";

export const USERS_REPOSITORY: UsersRepository = MongoUsersRepository;
export const PRODUCTS_REPOSITORY: ProductsRepository = MongoProductsRepository;
