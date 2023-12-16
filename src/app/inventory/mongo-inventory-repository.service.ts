import {InventoryRepository} from "./inventory-repository.type";
import {
    CreateInventoryRecordDTO,
    DeleteInventoryRecordDTO,
    GetInventoryRecordDTO,
    InventoryRecordsDTO,
    InventoryRecordUpdateFields,
    UpdateInventoryRecordDTO,
    UpdateInventoryRecordsDTO
} from "./inventory-records-dtos.type";
import {InventoryRecord} from "./inventory-record.type";
import {CommandResult} from "../../shared/command-result/command-result.type";
import InventoryRecordsModel from "./mongo-inventory-records-model.type";
import {DeleteResult} from "mongodb";
import {UpdateWriteOpResult} from "mongoose";

export const MongoInventoryRepository: InventoryRepository = {
    getRecord: (dto: GetInventoryRecordDTO): Promise<InventoryRecord> =>
        InventoryRecordsModel.findById(dto._id),

    getRecords: (dto: InventoryRecordsDTO): Promise<InventoryRecord[]> => {
        const filter = mapDTOToFilter(dto);
        const query = InventoryRecordsModel.find(filter);
        if (dto.sort !== undefined)
            query.sort({[dto.sort.field]: dto.sort.order === 'asc' ? 1 : -1});
        if (dto.page !== undefined) {
            query.skip(dto.page.index * dto.page.limit);
            query.limit(dto.page.limit);
        }
        return query.exec();
    },

    createRecord: (dto: CreateInventoryRecordDTO): Promise<InventoryRecord> =>
        new InventoryRecordsModel({
            productId: dto.productId,
            count: dto.count,
        }).save(),

    updateRecord: (dto: UpdateInventoryRecordDTO): Promise<InventoryRecord> =>
        InventoryRecordsModel.findOneAndUpdate(
            {_id: dto._id},
            mapUpdateFieldsToUpdateQuery(dto.updateFields),
            {new: true},
        ),

    updateRecords: async (dto: UpdateInventoryRecordsDTO): Promise<CommandResult> => {
        const filter = mapUpdateInventoryRecordsDTOToFilter(dto);
        const query = mapUpdateFieldsToUpdateQuery(dto.updateFields);
        const result: UpdateWriteOpResult = await InventoryRecordsModel.updateMany(filter, query);
        return {success: result.acknowledged, affectedCount: result.modifiedCount};
    },

    deleteRecord: async (dto: DeleteInventoryRecordDTO): Promise<CommandResult> => {
        const result: DeleteResult = await InventoryRecordsModel.deleteOne({_id: dto._id});
        return {success: result.acknowledged, affectedCount: result.deletedCount};
    },

    deleteRecords: async (dto: InventoryRecordsDTO): Promise<CommandResult> => {
        const filter = mapDTOToFilter(dto);
        const result: DeleteResult = await InventoryRecordsModel.deleteMany(filter);
        return {success: result.acknowledged, affectedCount: result.deletedCount};
    },

    exists: async (dto: GetInventoryRecordDTO): Promise<boolean> => {
        try {
            const record: InventoryRecord = await InventoryRecordsModel.findById(dto._id);
            return !!record;
        } catch (error) {
            return false;
        }
    }
};

const mapDTOToFilter = (dto: InventoryRecordsDTO) => ({
    ...dto.filter.productId && {productId: dto.filter.productId},
    ...dto.filter.countRange && {
        ...(dto.filter.countRange.start && !dto.filter.countRange.end)
        && {count: {$gt: dto.filter.countRange.start}},
        ...(!dto.filter.countRange.start && dto.filter.countRange.end)
        && {count: {$lt: dto.filter.countRange.end}},
        ...(dto.filter.countRange.start && dto.filter.countRange.end) && {
            count: {
                $gt: dto.filter.countRange.start,
                $lt: dto.filter.countRange.end
            }
        },
    },
    ...dto.timestamps && {
        ...dto.timestamps.createdAt && {
            ...(dto.timestamps.createdAt.start && !dto.timestamps.createdAt.end) && {
                createdAt: {$gt: dto.timestamps.createdAt.start}
            },
            ...(!dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) && {
                createdAt: {$lt: dto.timestamps.createdAt.end}
            },
            ...(dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) && {
                createdAt: {$gt: dto.timestamps.createdAt.start, $lt: dto.timestamps.createdAt.end}
            }
        },
        ...dto.timestamps.updatedAt && {
            ...(dto.timestamps.updatedAt.start && !dto.timestamps.updatedAt.end) && {
                updatedAt: {$gt: dto.timestamps.updatedAt.start}
            },
            ...(!dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) && {
                updatedAt: {$lt: dto.timestamps.updatedAt.end}
            },
            ...(dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) && {
                updatedAt: {$gt: dto.timestamps.updatedAt.start, $lt: dto.timestamps.updatedAt.end}
            }
        }
    },
});

const mapUpdateFieldsToUpdateQuery = (updateFields: InventoryRecordUpdateFields) => ({
    ...updateFields.newProductId && {productId: updateFields.newProductId},
    ...updateFields.newCount && {count: updateFields.newCount},
    ...updateFields.countDelta && {$inc: {count: updateFields.countDelta}},
});

const mapUpdateInventoryRecordsDTOToFilter = (dto: UpdateInventoryRecordsDTO) => ({
    ...dto.filter.productId && {productId: dto.filter.productId},
    ...dto.filter.countRange && {
        ...(dto.filter.countRange.start && !dto.filter.countRange.end)
        && {count: {$gt: dto.filter.countRange.start}},
        ...(!dto.filter.countRange.start && dto.filter.countRange.end)
        && {count: {$lt: dto.filter.countRange.end}},
        ...(dto.filter.countRange.start && dto.filter.countRange.end) && {
            count: {
                $gt: dto.filter.countRange.start,
                $lt: dto.filter.countRange.end
            }
        },
    },
    ...dto.timestamps && {
        ...dto.timestamps.createdAt && {
            ...(dto.timestamps.createdAt.start && !dto.timestamps.createdAt.end) && {
                createdAt: {$gt: dto.timestamps.createdAt.start}
            },
            ...(!dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) && {
                createdAt: {$lt: dto.timestamps.createdAt.end}
            },
            ...(dto.timestamps.createdAt.start && dto.timestamps.createdAt.end) && {
                createdAt: {$gt: dto.timestamps.createdAt.start, $lt: dto.timestamps.createdAt.end}
            }
        },
        ...dto.timestamps.updatedAt && {
            ...(dto.timestamps.updatedAt.start && !dto.timestamps.updatedAt.end) && {
                updatedAt: {$gt: dto.timestamps.updatedAt.start}
            },
            ...(!dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) && {
                updatedAt: {$lt: dto.timestamps.updatedAt.end}
            },
            ...(dto.timestamps.updatedAt.start && dto.timestamps.updatedAt.end) && {
                updatedAt: {$gt: dto.timestamps.updatedAt.start, $lt: dto.timestamps.updatedAt.end}
            }
        }
    },
});
