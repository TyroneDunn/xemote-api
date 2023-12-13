import {InventoryRecord} from "./inventory-record.type";
import {Document, Schema} from "mongoose";
import database from "../environment/mongoose-database";

export interface InventoryRecordDocument extends Document, InventoryRecord {
    productId: string,
    count: number,
}

const InventoryRecordSchema = new Schema(
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

const InventoryRecordsModel = database.model<InventoryRecordDocument>('inventory-records', InventoryRecordSchema);
export default InventoryRecordsModel;
