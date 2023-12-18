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
            if (dto.filter.countRange) {
                if (dto.filter.countRange.start && (dto.filter.countRange.start < 0))
                    return {
                        error: {
                            type: "BadRequest", message: 'Invalid count range. Count range' +
                                ' start value must be greater than 0.'
                        }
                    };
                if (dto.filter.countRange.end && (dto.filter.countRange.end < 0))
                    return {
                        error: {
                            type: "BadRequest", message: 'Invalid count range. Count range' +
                                ' end value must be greater than 0.'
                        }
                    };
                if ((dto.filter.countRange.start && dto.filter.countRange.end)
                    && (dto.filter.countRange.end < dto.filter.countRange.start))
                    return {
                        error: {
                            type: "BadRequest", message: 'Invalid count range. Count range' +
                                ' end value must be greater than start value.'
                        }
                    };
            }

            if (dto.timestamps) {
                if (dto.timestamps.createdAt) {
                    if (dto.timestamps.createdAt.start && isNaN(Date.parse(dto.timestamps.createdAt.start)))
                        return {
                            error: {
                                type: "BadRequest", message: 'Invalid createdAt start' +
                                    ' date. Provide a valid ISO date string.'
                            }
                        };
                    if (dto.timestamps.createdAt.end && isNaN(Date.parse(dto.timestamps.createdAt.end)))
                        return {
                            error: {
                                type: "BadRequest", message: 'Invalid createdAt end' +
                                    ' date. Provide a valid ISO date string.'
                            }
                        };
                }
                if (dto.timestamps.updatedAt) {
                    if (dto.timestamps.updatedAt.start && isNaN(Date.parse(dto.timestamps.updatedAt.start)))
                        return {
                            error: {
                                type: "BadRequest", message: 'Invalid updatedAt start' +
                                    ' date. Provide a valid ISO date string.'
                            }
                        };
                    if (dto.timestamps.updatedAt.end && isNaN(Date.parse(dto.timestamps.updatedAt.end)))
                        return {
                            error: {
                                type: "BadRequest", message: 'Invalid updatedAt end' +
                                    ' date. Provide a valid ISO date string.'
                            }
                        };
                }
            }

            if (dto.sort) {
                if (dto.sort.field && !dto.sort.order)
                    return {error: {type: "BadRequest", message: 'Invalid sort. Provide sort order.'}};
                if (!dto.sort.field && dto.sort.order)
                    return {error: {type: "BadRequest", message: 'Invalid sort. Provide sort field.'}};
                if (dto.sort.field !== "count")
                    return {
                        error: {
                            type: "BadRequest", message: 'Invalid sort. Sort field must be' +
                                ' "count".'
                        }
                    };
                if (dto.sort.order !== "asc" && dto.sort.order !== "desc")
                    return {
                        error: {
                            type: "BadRequest", message: 'Invalid sort. Sort order must be' +
                                ' "asc" or "desc".'
                        }
                    };
            }

            if (dto.page) {
                if (dto.page.index && !dto.page.limit)
                    return {error: {type: "BadRequest", message: 'Invalid page. Provide page limit.'}};
                if (!dto.page.index && dto.page.limit)
                    return {error: {type: "BadRequest", message: 'Invalid page. Provide page index.'}};
                if (dto.page.index < 0)
                    return {
                        error: {
                            type: "BadRequest", message: 'Invalid page. Page index must be' +
                                ' 0 or greater.'
                        }
                    };
                if (dto.page.limit < 1)
                    return {
                        error: {
                            type: "BadRequest", message: 'Invalid page. Page limit must be' +
                                ' 1 or greater.'
                        }
                    };
            }

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