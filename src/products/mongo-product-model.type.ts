import {Product, ProductType} from "./product.type";
import {Document, Schema} from "mongoose";
import database from "../environment/mongoose-database";
import {Price} from "../shared/price.type";

export interface ProductDocument extends Document, Product {
    _id: string,
    name: string,
    costPrice: Price,
    markup: number,
    type: ProductType,
}

const CostPriceSchema = new Schema(
    {
        price: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true,
        },
    },
    {_id: false, }
);

const ProductSchema = new Schema<ProductDocument>(
    {
        name: {
            type: String,
            required: true
        },
        costPrice: {
            type: CostPriceSchema,
            required: true,
        },
        markup: {
            type: Number,
            required: true
        },
        type: {
            type: String,
        }
    },
    {timestamps: true}
);

const ProductModel = database.model<ProductDocument>('products', ProductSchema);
export {ProductModel};
