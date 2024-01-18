import { Document, Schema } from "mongoose";
import database from "../../database/mongodb.config";
import { Price, Product, ProductCategory } from "./products.type";

export interface ProductDocument extends Document, Product {
   _id: string,
   name: string,
   costPrice: Price,
   markup: number,
   category: ProductCategory,
   imageUrl: string
}

const CostPriceSchema = new Schema(
   {
      price: {
         type: Number,
         required: true,
      },
      currency: {
         type: String,
         required: true,
      },
   },
   { _id: false },
);

const ProductSchema = new Schema<ProductDocument>(
   {
      name: {
         type: String,
         required: true,
      },
      costPrice: {
         type: CostPriceSchema,
         required: true,
      },
      markup: {
         type: Number,
         required: true,
      },
      category: {
         type: String,
      },
      imageUrl: {
         type: String,
      }
   },
   { timestamps: true },
);

const ProductModel = database.model<ProductDocument>('products', ProductSchema);
export { ProductModel };
