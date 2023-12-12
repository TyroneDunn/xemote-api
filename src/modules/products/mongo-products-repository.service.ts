import {ProductsRepository} from "./products-repository.type";
import {ProductModel} from "./mongo-product-model.type";
import {Product} from "./product.type";
import {
    GetProductDTO,
    ProductsDTO,
    CreateProductDTO,
    UpdateProductDTO,
    UpdateProductsDTO,
    DeleteProductDTO,
    UpdateProductFields,
} from "./products-dtos.type";
import UserModel from "../users/mongo-user.model";
import {DeleteResult} from "mongodb";

export const MongoProductsRepository: ProductsRepository = {
    getProduct: (dto: GetProductDTO): Promise<Product> =>
        ProductModel.findById(dto._id),

    getProducts: (dto: ProductsDTO): Promise<Product[]> => {
        const filter = mapToProductsFilter(dto);
        const query = ProductModel.find(filter);
        if (dto.sort !== undefined)
            query.sort({[dto.sort.field]: dto.sort.order === 'asc'? 1: -1});
        if (dto.page !== undefined) {
            query.skip(dto.page.index * dto.page.limit);
            query.limit(dto.page.limit);
        }
        return query.exec();
    },

    createProduct: (dto: CreateProductDTO): Promise<Product> =>
        new ProductModel({
            name: dto.name,
            type: dto.type,
            costPrice: dto.costPrice,
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
            mapToProductsFilter(dto),
            mapToUpdateProductQuery(dto.updateFields),
        );
        return UserModel.find(mapToProductsFilter(dto));
    },

    deleteProduct: async (dto: DeleteProductDTO): Promise<Product> => {
        const result = (await ProductModel.findByIdAndDelete(dto._id));
        if (result.ok === 0) throw new Error(`Error deleting product "${dto._id}".`);
        return result.value;
    },

    deleteProducts: async (dto: ProductsDTO): Promise<Product[]> => {
        const filter = mapToProductsFilter(dto);
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

const mapToProductsFilter = (dto: ProductsDTO) => ({
    ...dto.filter.name && {name: dto.filter.name},
    ...dto.filter.nameRegex && {name: {$regex: dto.filter.nameRegex, $options: 'i'}},
    ...dto.filter.type && {type: dto.filter.type},
    ...dto.filter.typeRegex && {type: {$regex: dto.filter.typeRegex, $options: 'i'}},
    ...dto.filter.costPriceRange && {
        ...(dto.filter.costPriceRange.start && !dto.filter.costPriceRange.end) && {'costPrice.price': {$gt: dto.filter.costPriceRange.start}},
        ...(!dto.filter.costPriceRange.start && dto.filter.costPriceRange.end) && {'costPrice.price': {$lt: dto.filter.costPriceRange.end}},
        ...(dto.filter.costPriceRange.start && dto.filter.costPriceRange.end) && {'costPrice.price': {$gt: dto.filter.costPriceRange.start, $lt: dto.filter.costPriceRange.end}},
    },
    ...dto.filter.markupRange && {
        ...(dto.filter.markupRange.start && !dto.filter.markupRange.end) && {markup: {$gt: dto.filter.markupRange.start}},
        ...(!dto.filter.markupRange.start && dto.filter.markupRange.end) && {markup: {$lt: dto.filter.markupRange.end}},
        ...(dto.filter.markupRange.start && dto.filter.markupRange.end) && {markup: {$gt: dto.filter.markupRange.start, $lt: dto.filter.markupRange.end}},
    },
    ...dto.timestamps && {
        ...dto.timestamps.createdAt && {
            ...(dto.timestamps.createdAt.start && !dto.timestamps.createdAt.end) && {
                createdAt: {$gt: dto.timestamps.createdAt.start}
            },
            ...(!dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) && {
                createdAt: {$lt: dto.timestamps.createdAt.end}
            },
            ...(dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) && {
                createdAt: {$gt: dto.timestamps.createdAt.start, $lt: dto.timestamps.createdAt.end}
            }
        },
        ...dto.timestamps.updatedAt && {
            ...(dto.timestamps.updatedAt.start && !dto.timestamps.updatedAt.end) && {
                updatedAt: {$gt: dto.timestamps.updatedAt.start}
            },
            ...(!dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) && {
                updatedAt: {$lt: dto.timestamps.updatedAt.end}
            },
            ...(dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) && {
                updatedAt: {$gt: dto.timestamps.updatedAt.start, $lt: dto.timestamps.updatedAt.end}
            }
        }
    },
});
