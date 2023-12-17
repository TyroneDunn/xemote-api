import {ProductsRepository} from "./products-repository.type";
import {ProductModel} from "./mongo-product-model.type";
import {Product} from "./product.type";
import {
    CreateProductDTO,
    DeleteProductDTO,
    GetProductDTO,
    ProductsDTO,
    ProductUpdateFields,
    UpdateProductDTO,
    UpdateProductsDTO,
} from "./products-dtos.type";
import {DeleteResult} from "mongodb";
import {Price} from "./price.type";
import {UpdateWriteOpResult} from "mongoose";
import {CommandResult} from "@hals/common";

export const MongoProductsRepository: ProductsRepository = {
    getProduct: (dto: GetProductDTO): Promise<Product> =>
        ProductModel.findById(dto._id),

    getProducts: (dto: ProductsDTO): Promise<Product[]> => {
        const filter = mapProductsDtoToProductsFilter(dto);
        const query = ProductModel.find(filter);
        if (dto.sort !== undefined)
            query.sort({[dto.sort.field]: dto.sort.order === 'asc' ? 1 : -1});
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
            mapUpdateFieldsToUpdateQuery(dto.updateFields),
            {new: true},
        ),

    updateProducts: async (dto: UpdateProductsDTO): Promise<CommandResult> => {
        const filter = mapUpdateProductsDtoToFilter(dto);
        const updateQuery = mapUpdateFieldsToUpdateQuery(dto.updateFields);
        const updateResult: UpdateWriteOpResult = await ProductModel.updateMany(filter, updateQuery);
        return {success: updateResult.acknowledged, affectedCount: updateResult.modifiedCount};
    },

    deleteProduct: async (dto: DeleteProductDTO): Promise<CommandResult> => {
        const result: DeleteResult = await ProductModel.deleteOne({_id: dto._id});
        return {success: result.acknowledged, affectedCount: result.deletedCount};
    },

    deleteProducts: async (dto: ProductsDTO): Promise<CommandResult> => {
        const filter = mapProductsDtoToProductsFilter(dto);
        const result: DeleteResult = await ProductModel.deleteMany(filter);
        return {success: result.acknowledged, affectedCount: result.deletedCount};
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

const mapProductsDtoToProductsFilter = (dto: ProductsDTO) => ({
    ...dto.filter.name && {name: dto.filter.name},
    ...dto.filter.nameRegex && {name: {$regex: dto.filter.nameRegex, $options: 'i'}},
    ...dto.filter.type && {type: dto.filter.type},
    ...dto.filter.typeRegex && {type: {$regex: dto.filter.typeRegex, $options: 'i'}},
    ...dto.filter.costPriceRange && {
        ...(dto.filter.costPriceRange.start && !dto.filter.costPriceRange.end) && {'costPrice.price': {$gt: dto.filter.costPriceRange.start}},
        ...(!dto.filter.costPriceRange.start && dto.filter.costPriceRange.end) && {'costPrice.price': {$lt: dto.filter.costPriceRange.end}},
        ...(dto.filter.costPriceRange.start && dto.filter.costPriceRange.end) && {
            'costPrice.price': {
                $gt: dto.filter.costPriceRange.start,
                $lt: dto.filter.costPriceRange.end
            }
        },
    },
    ...dto.filter.markupRange && {
        ...(dto.filter.markupRange.start && !dto.filter.markupRange.end) && {markup: {$gt: dto.filter.markupRange.start}},
        ...(!dto.filter.markupRange.start && dto.filter.markupRange.end) && {markup: {$lt: dto.filter.markupRange.end}},
        ...(dto.filter.markupRange.start && dto.filter.markupRange.end) && {
            markup: {
                $gt: dto.filter.markupRange.start,
                $lt: dto.filter.markupRange.end
            }
        },
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

const mapUpdateProductsDtoToFilter = (dto: UpdateProductsDTO) => ({
    ...dto.filter.name && {name: dto.filter.name},
    ...dto.filter.nameRegex && {name: {$regex: dto.filter.nameRegex, $options: 'i'}},
    ...dto.filter.type && {type: dto.filter.type},
    ...dto.filter.typeRegex && {type: {$regex: dto.filter.typeRegex, $options: 'i'}},
    ...dto.filter.costPriceRange && {
        ...(dto.filter.costPriceRange.start && !dto.filter.costPriceRange.end) && {'costPrice.price': {$gt: dto.filter.costPriceRange.start}},
        ...(!dto.filter.costPriceRange.start && dto.filter.costPriceRange.end) && {'costPrice.price': {$lt: dto.filter.costPriceRange.end}},
        ...(dto.filter.costPriceRange.start && dto.filter.costPriceRange.end) && {
            'costPrice.price': {
                $gt: dto.filter.costPriceRange.start,
                $lt: dto.filter.costPriceRange.end
            }
        },
    },
    ...dto.filter.markupRange && {
        ...(dto.filter.markupRange.start && !dto.filter.markupRange.end) && {markup: {$gt: dto.filter.markupRange.start}},
        ...(!dto.filter.markupRange.start && dto.filter.markupRange.end) && {markup: {$lt: dto.filter.markupRange.end}},
        ...(dto.filter.markupRange.start && dto.filter.markupRange.end) && {
            markup: {
                $gt: dto.filter.markupRange.start,
                $lt: dto.filter.markupRange.end
            }
        },
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

const mapUpdateFieldsToUpdateQuery = (dto: ProductUpdateFields) => ({
    ...dto.newName && {name: dto.newName},
    ...dto.newType && {type: dto.newType},
    ...dto.newCostPrice && {costPrice: dto.newCostPrice as Price},
    ...dto.newMarkup && {markup: dto.newMarkup},
});
