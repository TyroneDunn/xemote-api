import {Inventory} from "./inventory.type";
import {Document, Schema} from "mongoose";
import database from "../environment/mongoose-database";

export interface InventoryDocument extends Document, Inventory {
    productId: string,
    count: number,
}

const InventorySchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "ProductsSchema",
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    },
    {_id: false}
);

const InventoryModel = database.model<InventoryDocument>('inventory', InventorySchema);
export {InventoryModel};
