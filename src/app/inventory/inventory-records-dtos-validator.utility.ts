import {
    CreateInventoryRecordDTO,
    DeleteInventoryRecordDTO,
    GetInventoryRecordDTO,
    InventoryRecordsDTO,
    UpdateInventoryRecordDTO,
    UpdateInventoryRecordsDTO
} from "./inventory-records-dtos.type";
import {InventoryRepository} from "./inventory-repository.type";
import {ValidationOutcome} from "@hals/common";

export type InventoryRecordsDtosValidator = {
    validateGetInventoryRecordDto: (dto: GetInventoryRecordDTO) => Promise<ValidationOutcome>,
    validateInventoryRecordsDto: (dto: InventoryRecordsDTO) => Promise<ValidationOutcome>,
    validateCreateInventoryRecordDto: (dto: CreateInventoryRecordDTO) => Promise<ValidationOutcome>,
    validateUpdateInventoryRecordDto: (dto: UpdateInventoryRecordDTO) => Promise<ValidationOutcome>,
    validateUpdateInventoryRecordsDto: (dto: UpdateInventoryRecordsDTO) => Promise<ValidationOutcome>,
    validateDeleteInventoryRecordDto: (dto: DeleteInventoryRecordDTO) => Promise<ValidationOutcome>,
};

export const configureInventoryRecordsDtosValidator =
    (repository: InventoryRepository): InventoryRecordsDtosValidator => ({
        validateGetInventoryRecordDto: async (dto: GetInventoryRecordDTO): Promise<ValidationOutcome> => {
            if (!dto._id)
                return {error: {type: "BadRequest", message: 'ID required.'}};
            if (!(await repository.exists(dto)))
                return {error: {type: "NotFound", message: `Inventory record "${dto._id}" not found.`}};
            return {};
        },

        validateInventoryRecordsDto: async (dto: InventoryRecordsDTO): Promise<ValidationOutcome> => {
            return {};
        },

        validateCreateInventoryRecordDto: async (dto: CreateInventoryRecordDTO): Promise<ValidationOutcome> => {
            return {};
        },

        validateUpdateInventoryRecordDto: async (dto: UpdateInventoryRecordDTO): Promise<ValidationOutcome> => {
            return {};
        },

        validateUpdateInventoryRecordsDto: async (dto: UpdateInventoryRecordsDTO): Promise<ValidationOutcome> => {
            return {};
        },

        validateDeleteInventoryRecordDto: async (dto: DeleteInventoryRecordDTO): Promise<ValidationOutcome> => {
            return {};
        },
    });
