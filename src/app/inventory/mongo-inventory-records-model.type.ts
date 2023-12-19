import { InventoryRecord } from "./inventory-record.type";
import { Document, Schema } from "mongoose";
import database from "../../database/mongodb.config";

export interface InventoryRecordDocument extends Document, InventoryRecord {
    productId: string,
    count: number,
}

const InventoryRecordSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "ProductSchema",
            unique: true,
            required: true,
        },
        count: {
            type: Number,
            required: true
        }
    },
   { timestamps: true },
);

const InventoryRecordsModel = database.model<InventoryRecordDocument>('inventory-records', InventoryRecordSchema);
export default InventoryRecordsModel;
