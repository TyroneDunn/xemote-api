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
    DeleteProductsDTO
} from "./products-dtos.type";

export const MongoProductsRepository: ProductsRepository = {
    getProduct: (dto: GetProductDTO): Promise<Product> =>
        ProductModel.findById(dto._id),

    getProducts: (dto: GetProductsDTO): Promise<Product[]> => {
        const filter = mapToProductsFilter(dto);
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
            mapToUpdateProductQuery(dto),
            {new: true},
        ),

    },

    updateProducts(dto: UpdateProductsDTO): Promise<Product[]> {

    },

    deleteProduct(dto: DeleteProductDTO): Promise<Product> {

    },

    deleteProducts(dto: DeleteProductsDTO): Promise<Product[]> {

    },

    exists(dto: GetProductDTO): Promise<boolean> {
        return false;
    }
};

const mapToProductsFilter = (dto: GetProductsDTO) => ({
    ...dto.filter.name && {name: dto.filter.name},
    ...dto.filter.nameRegex && {name: {$regex: dto.filter.nameRegex, $options: 'i'}},
    ...dto.filter.type && {type: dto.filter.type},
    ...dto.filter.typeRegex && {type: {$regex: dto.filter.typeRegex, $options: 'i'}},
    ...(dto.filter.costRange.start && !dto.filter.costRange.end)  && {cost: {$gt: dto.filter.costRange.start}},
    ...(!dto.filter.costRange.start && dto.filter.costRange.end)  && {cost: {$lt: dto.filter.costRange.end}},
    ...(dto.filter.costRange.start && dto.filter.costRange.end)  && {cost: {$gt: dto.filter.costRange.start, $lt: dto.filter.costRange.end}},
});

