import {ProductsRepository} from "./products-repository.type";
import {ProductModel} from "./mongo-product-model.type";
import {Product} from "./product.type";
import {
    GetProductDTO,
    GetProductsDTO,
    CreateProductDTO,
    UpdateProductDTO,
    UpdateProductsDTO,
    DeleteProductDTO,
    DeleteProductsDTO,
    UpdateProductFields,
    ProductsFilter
} from "./products-dtos.type";
import UserModel from "../users/mongo-user.model";
import {DeleteResult} from "mongodb";

export const MongoProductsRepository: ProductsRepository = {
    getProduct: (dto: GetProductDTO): Promise<Product> =>
        ProductModel.findById(dto._id),

    getProducts: (dto: GetProductsDTO): Promise<Product[]> => {
        const filter = mapToProductsFilter(dto.filter);
        const query = ProductModel.find(filter);
        dto.sort.forEach(productsSort => {
            query.sort({[productsSort.option]: productsSort.order === "asc"? 1: -1})
        });
        query.skip(dto.page.index * dto.page.limit);
        query.limit(dto.page.limit);
        return query.exec();
    },

    createProduct: (dto: CreateProductDTO): Promise<Product> =>
        new ProductModel({
            name: dto.name,
            type: dto.type,
            costOfGood: dto.costOfGood,
            markup: dto.markup,
        }).save(),

    updateProduct: (dto: UpdateProductDTO): Promise<Product> =>
        ProductModel.findOneAndUpdate(
            {_id: dto._id},
            mapToUpdateProductQuery(dto.updateFields),
            {new: true},
        ),

    updateProducts: async (dto: UpdateProductsDTO): Promise<Product[]> => {
        await UserModel.updateMany(
            mapToProductsFilter(dto.filter),
            mapToUpdateProductQuery(dto.updateFields),
        );
        return UserModel.find(mapToProductsFilter(dto.filter));
    },

    deleteProduct: async (dto: DeleteProductDTO): Promise<Product> => {
        const result = (await ProductModel.findByIdAndDelete(dto._id));
        if (result.ok === 0) throw new Error(`Error deleting product "${dto._id}".`);
        return result.value;
    },

    deleteProducts: async (dto: DeleteProductsDTO): Promise<Product[]> => {
        const filter = mapToProductsFilter(dto.filter);
        const products: Product[] = await ProductModel.find(filter);
        const result: DeleteResult = await ProductModel.deleteMany(filter);
        if (!result.acknowledged) throw new Error(`Error deleting products.\n Filter: ${filter}`);
        return products;
    },

    exists: async (dto: GetProductDTO): Promise<boolean> => {
        try {
            const product: Product = await ProductModel.findById(dto._id);
            return !!product;
        } catch (error) {
            return false;
        }
    }
};

const mapToUpdateProductQuery = (dto: UpdateProductFields) => ({
    ...dto.newName && {name: dto.newName},
    ...dto.newType && {type: dto.newType},
    ...dto.newCostOfGood && {costOfGood: dto.newCostOfGood},
    ...dto.newMarkup && {markup: dto.newMarkup},
});

const mapToProductsFilter = (dto: ProductsFilter) => ({
    ...dto.name && {name: dto.name},
    ...dto.nameRegex && {name: {$regex: dto.nameRegex, $options: 'i'}},
    ...dto.type && {type: dto.type},
    ...dto.typeRegex && {type: {$regex: dto.typeRegex, $options: 'i'}},
    ...(dto.costRange.start && !dto.costRange.end)  && {cost: {$gt: dto.costRange.start}},
    ...(!dto.costRange.start && dto.costRange.end)  && {cost: {$lt: dto.costRange.end}},
    ...(dto.costRange.start && dto.costRange.end)  && {cost: {$gt: dto.costRange.start, $lt: dto.costRange.end}},
});
