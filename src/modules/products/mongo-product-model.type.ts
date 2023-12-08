import {Product, ProductType} from "./product.type";
import {Document, Schema} from "mongoose";
import database from "../../environment/mongoose-database";
import {Price} from "../../shared/price.type";

interface ProductsDocument extends Document, Product {
    _id: string,
    name: string,
    costOfGood: Price,
    markup: number,
    type: ProductType,
}

const PriceSchema = new Schema({
    price: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true,
    },
})

const ProductSchema = new Schema<ProductsDocument>({
    name: {
        type: String,
        required: true
    },
    costOfGood: {
        type: PriceSchema,
        required: true,
    },
    markup: {
        type: Number,
        required: true
    },
    type: {
        type: String,
    }
});

const ProductModel = database.model<ProductsDocument>('products', ProductSchema);
export {ProductModel};
