import {InventoryRecord} from "./inventory-record.type";
import {Document, Schema} from "mongoose";
import database from "../environment/mongoose-database";

export interface InventoryRecordsDocument extends Document, InventoryRecord {
    productId: string,
    count: number,
}

const InventoryRecordsSchema = new Schema(
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

const InventoryRecordsModel = database.model<InventoryRecordsDocument>('inventory-records', InventoryRecordsSchema);
export {InventoryRecordsModel};
