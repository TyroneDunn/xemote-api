import {Product, ProductType} from "./product.type";
import {Document, Schema} from "mongoose";
import database from "../../environment/mongoose-database";

interface ProductsDocument extends Document, Product {
    _id: string,
    name: string,
    costOfGood: number,
    markup: number,
    type: ProductType,
}

const ProductSchema = new Schema<ProductsDocument>({
    name: {
        type: String,
        required: true
    },
    costOfGood: {
        type: Number,
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

const ProductModel = database.model<ProductsDocument>('Product', ProductSchema);
export default ProductModel;