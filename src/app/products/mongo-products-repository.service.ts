import { ProductsRepository } from "./products-repository.type";
import { ProductModel } from "./mongo-product-model.type";
import {
   CreateProductRequest,
   DeleteProductRequest,
   GetProductRequest,
   Price,
   Product,
   ProductsRequest,
   ProductUpdateFields,
   UpdateProductRequest,
   UpdateProductsRequest,
} from "./products.type";
import { DeleteResult } from "mongodb";
import { UpdateWriteOpResult } from "mongoose";
import { CommandResult, Error } from "@hals/common";

export const MongoProductsRepository : ProductsRepository = {
   getProduct: async (request : GetProductRequest) : Promise<Product | Error> => {
      try {
         const product : Product | null = await ProductModel.findById(request._id);
         if (!product) return { type: "NotFound", message: 'Product not found.' };
         return product;
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   getProducts: async (request : ProductsRequest) : Promise<Product[] | Error> => {
      try {
         const filter = mapProductsRequestToProductsFilter(request);
         const query = ProductModel.find(filter);
         if (request.sort !== undefined)
            query.sort({ [request.sort.field]: request.sort.order === 'asc' ? 1 : -1 });
         if (request.page !== undefined) {
            query.skip(request.page.index * request.page.limit);
            query.limit(request.page.limit);
         }
         return query.exec();
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   createProduct: async (request : CreateProductRequest) : Promise<Product | Error> => {
      try {
         return new ProductModel({
            name      : request.name,
            category  : request.category,
            costPrice : request.costPrice,
            markup    : request.markup,
         }).save();
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   updateProduct: async (request : UpdateProductRequest) : Promise<Product | Error> => {
      try {
         const product : Product | null = await ProductModel.findOneAndUpdate(
            { _id: request._id },
            mapUpdateFieldsToUpdateQuery(request.updateFields),
            { new: true },
         );
         if (!product) return { type: "NotFound", message: 'Product not found.' };
         return product;
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   updateProducts: async (request : UpdateProductsRequest) : Promise<CommandResult | Error> => {
      try {
         const filter = mapUpdateProductsRequestToFilter(request);
         const updateQuery = mapUpdateFieldsToUpdateQuery(request.updateFields);
         const updateResult : UpdateWriteOpResult = await ProductModel.updateMany(filter, updateQuery);
         return { success: updateResult.acknowledged, affectedCount: updateResult.modifiedCount };
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   deleteProduct: async (request : DeleteProductRequest) : Promise<CommandResult | Error> => {
      try {
         const result : DeleteResult = await ProductModel.deleteOne({ _id: request._id });
         return { success: result.acknowledged, affectedCount: result.deletedCount };
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   deleteProducts: async (request : ProductsRequest) : Promise<CommandResult | Error> => {
      try {
         const filter = mapProductsRequestToProductsFilter(request);
         const result : DeleteResult = await ProductModel.deleteMany(filter);
         return { success: result.acknowledged, affectedCount: result.deletedCount };
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },

   exists: async (request : GetProductRequest) : Promise<boolean | Error> => {
      try {
         const product : Product | null = await ProductModel.findById(request._id);
         return !!product;
      }
      catch (error) {
         return { type: "Internal", message: (error as Error).message };
      }
   },
};

const mapProductsRequestToProductsFilter = (dto : ProductsRequest) => ({
   ...dto.filter && {
      ...dto.filter.name && { name: dto.filter.name },
      ...dto.filter.nameRegex && { name: { $regex: dto.filter.nameRegex, $options: 'i' } },
      ...dto.filter.category && { category: dto.filter.category },
      ...dto.filter.categoryRegex && { category: { $regex: dto.filter.categoryRegex, $options: 'i' } },
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

const mapUpdateProductsRequestToFilter = (dto : UpdateProductsRequest) => ({
   ...dto.filter.name && { name: dto.filter.name },
   ...dto.filter.nameRegex && { name: { $regex: dto.filter.nameRegex, $options: 'i' } },
   ...dto.filter.category && { category: dto.filter.category },
   ...dto.filter.categoryRegex && { category: { $regex: dto.filter.categoryRegex, $options: 'i' } },
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

const mapUpdateFieldsToUpdateQuery = (dto : ProductUpdateFields) => ({
   ...dto.newName && { name: dto.newName },
   ...dto.newCategory && { category: dto.newCategory },
   ...dto.newCostPrice && { costPrice: dto.newCostPrice as Price },
   ...dto.newMarkup && { markup: dto.newMarkup },
});
