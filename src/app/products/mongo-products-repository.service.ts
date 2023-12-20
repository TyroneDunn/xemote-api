import { ProductsRepository } from "./products-repository.type";
import { ProductModel } from "./mongo-product-model.type";
import { Product } from "./product.type";
import {
   CreateProductDTO,
   DeleteProductDTO,
   GetProductDTO,
   ProductsDTO,
   ProductUpdateFields,
   UpdateProductDTO,
   UpdateProductsDTO,
} from "./products-dtos.type";
import { DeleteResult } from "mongodb";
import { Price } from "./price.type";
import { UpdateWriteOpResult } from "mongoose";
import { CommandResult, Error } from "@hals/common";

export const MongoProductsRepository: ProductsRepository = {
   getProduct: async (dto: GetProductDTO): Promise<Product | Error> => {
      try {
         const product: Product | null = await ProductModel.findById(dto._id);
         if (!product) return { type: "NotFound", message: 'Product not found.' };
         return product;
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   getProducts: async (dto: ProductsDTO): Promise<Product[] | Error> => {
      try {
         const filter = mapProductsDtoToProductsFilter(dto);
         const query = ProductModel.find(filter);
         if (dto.sort !== undefined)
            query.sort({ [dto.sort.field]: dto.sort.order === 'asc' ? 1 : -1 });
         if (dto.page !== undefined) {
            query.skip(dto.page.index * dto.page.limit);
            query.limit(dto.page.limit);
         }
         return query.exec();
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   createProduct: async (dto: CreateProductDTO): Promise<Product | Error> => {
      try {
         return new ProductModel({
            name: dto.name,
            type: dto.type,
            costPrice: dto.costPrice,
            markup: dto.markup,
         }).save();
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   updateProduct: async (dto: UpdateProductDTO): Promise<Product | Error> => {
      try {
         const product: Product | null = await ProductModel.findOneAndUpdate(
            { _id: dto._id },
            mapUpdateFieldsToUpdateQuery(dto.updateFields),
            { new: true },
         );
         if (!product) return { type: "NotFound", message: 'Product not found.' };
         return product;
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   updateProducts: async (dto: UpdateProductsDTO): Promise<CommandResult | Error> => {
      try {
         const filter = mapUpdateProductsDtoToFilter(dto);
         const updateQuery = mapUpdateFieldsToUpdateQuery(dto.updateFields);
         const updateResult: UpdateWriteOpResult = await ProductModel.updateMany(filter, updateQuery);
         return { success: updateResult.acknowledged, affectedCount: updateResult.modifiedCount };
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   deleteProduct: async (dto: DeleteProductDTO): Promise<CommandResult | Error> => {
      try {
         const result: DeleteResult = await ProductModel.deleteOne({ _id: dto._id });
         return { success: result.acknowledged, affectedCount: result.deletedCount };
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   deleteProducts: async (dto: ProductsDTO): Promise<CommandResult | Error> => {
      try {
         const filter = mapProductsDtoToProductsFilter(dto);
         const result: DeleteResult = await ProductModel.deleteMany(filter);
         return { success: result.acknowledged, affectedCount: result.deletedCount };
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   exists: async (dto: GetProductDTO): Promise<boolean | Error> => {
      try {
         const product: Product | null = await ProductModel.findById(dto._id);
         return !!product;
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },
};

const mapProductsDtoToProductsFilter = (dto: ProductsDTO) => ({
   ...dto.filter.name && { name: dto.filter.name },
   ...dto.filter.nameRegex && { name: { $regex: dto.filter.nameRegex, $options: 'i' } },
   ...dto.filter.type && { type: dto.filter.type },
   ...dto.filter.typeRegex && { type: { $regex: dto.filter.typeRegex, $options: 'i' } },
   ...dto.filter.costPriceRange && {
      ...(dto.filter.costPriceRange.start && !dto.filter.costPriceRange.end) &&
      { 'costPrice.price': { $gte: dto.filter.costPriceRange.start } },
      ...(!dto.filter.costPriceRange.start && dto.filter.costPriceRange.end) &&
      { 'costPrice.price': { $lte: dto.filter.costPriceRange.end } },
      ...(dto.filter.costPriceRange.start && dto.filter.costPriceRange.end) && {
         'costPrice.price': {
            $gte: dto.filter.costPriceRange.start,
            $lte: dto.filter.costPriceRange.end,
         },
      },
   },
   ...dto.filter.markupRange && {
      ...(dto.filter.markupRange.start && !dto.filter.markupRange.end) &&
      { markup: { $gte: dto.filter.markupRange.start } },
      ...(!dto.filter.markupRange.start && dto.filter.markupRange.end) &&
      { markup: { $lte: dto.filter.markupRange.end } },
      ...(dto.filter.markupRange.start && dto.filter.markupRange.end) && {
         markup: {
            $gte: dto.filter.markupRange.start,
            $lte: dto.filter.markupRange.end,
         },
      },
   },
   ...dto.timestamps && {
      ...dto.timestamps.createdAt && {
         ...(dto.timestamps.createdAt.start && !dto.timestamps.createdAt.end) &&
         { createdAt: { $gte: dto.timestamps.createdAt.start } },
         ...(!dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) &&
         { createdAt: { $lte: dto.timestamps.createdAt.end } },
         ...(dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) && {
            createdAt: {
               $gte: dto.timestamps.createdAt.start,
               $lte: dto.timestamps.createdAt.end,
            },
         },
      },
      ...dto.timestamps.updatedAt && {
         ...(dto.timestamps.updatedAt.start && !dto.timestamps.updatedAt.end) &&
         { updatedAt: { $gte: dto.timestamps.updatedAt.start } },
         ...(!dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) &&
         { updatedAt: { $lte: dto.timestamps.updatedAt.end } },
         ...(dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) && {
            updatedAt: {
               $gte: dto.timestamps.updatedAt.start,
               $lte: dto.timestamps.updatedAt.end,
            },
         },
      },
   },
});

const mapUpdateProductsDtoToFilter = (dto: UpdateProductsDTO) => ({
   ...dto.filter.name && { name: dto.filter.name },
   ...dto.filter.nameRegex && { name: { $regex: dto.filter.nameRegex, $options: 'i' } },
   ...dto.filter.type && { type: dto.filter.type },
   ...dto.filter.typeRegex && { type: { $regex: dto.filter.typeRegex, $options: 'i' } },
   ...dto.filter.costPriceRange && {
      ...(dto.filter.costPriceRange.start && !dto.filter.costPriceRange.end) &&
      { 'costPrice.price': { $gte: dto.filter.costPriceRange.start } },
      ...(!dto.filter.costPriceRange.start && dto.filter.costPriceRange.end) &&
      { 'costPrice.price': { $lte: dto.filter.costPriceRange.end } },
      ...(dto.filter.costPriceRange.start && dto.filter.costPriceRange.end) && {
         'costPrice.price': {
            $gte: dto.filter.costPriceRange.start,
            $lte: dto.filter.costPriceRange.end,
         },
      },
   },
   ...dto.filter.markupRange && {
      ...(dto.filter.markupRange.start && !dto.filter.markupRange.end) &&
      { markup: { $gte: dto.filter.markupRange.start } },
      ...(!dto.filter.markupRange.start && dto.filter.markupRange.end) &&
      { markup: { $lte: dto.filter.markupRange.end } },
      ...(dto.filter.markupRange.start && dto.filter.markupRange.end) && {
         markup: {
            $gte: dto.filter.markupRange.start,
            $lte: dto.filter.markupRange.end,
         },
      },
   },
   ...dto.timestamps && {
      ...dto.timestamps.createdAt && {
         ...(dto.timestamps.createdAt.start && !dto.timestamps.createdAt.end) &&
         { createdAt: { $gte: dto.timestamps.createdAt.start } },
         ...(!dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) &&
         { createdAt: { $lte: dto.timestamps.createdAt.end } },
         ...(dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) && {
            createdAt: {
               $gte: dto.timestamps.createdAt.start,
               $lte: dto.timestamps.createdAt.end,
            },
         },
      },
      ...dto.timestamps.updatedAt && {
         ...(dto.timestamps.updatedAt.start && !dto.timestamps.updatedAt.end) &&
         { updatedAt: { $gte: dto.timestamps.updatedAt.start } },
         ...(!dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) &&
         { updatedAt: { $lte: dto.timestamps.updatedAt.end } },
         ...(dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) && {
            updatedAt: {
               $gte: dto.timestamps.updatedAt.start,
               $lte: dto.timestamps.updatedAt.end,
            },
         },
      },
   },
});

const mapUpdateFieldsToUpdateQuery = (dto: ProductUpdateFields) => ({
   ...dto.newName && { name: dto.newName },
   ...dto.newType && { type: dto.newType },
   ...dto.newCostPrice && { costPrice: dto.newCostPrice as Price },
   ...dto.newMarkup && { markup: dto.newMarkup },
});
