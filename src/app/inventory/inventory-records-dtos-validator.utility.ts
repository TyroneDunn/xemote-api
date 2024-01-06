import {
   GetInventoryRecordDTO,
   InventoryRecord,
   InventoryRecordsDTO,
   UpdateInventoryRecordDTO,
   UpdateInventoryRecordsDTO,
} from "./inventory-records.type";
import { InventoryRepository } from "./inventory-repository.type";
import { Error, isError, ValidationError } from "@hals/common";

export type InventoryRecordsDtosValidator = {
   validateGetInventoryRecordDto: (dto: GetInventoryRecordDTO) => Promise<ValidationError | null>,
   validateInventoryRecordsDto: (dto: InventoryRecordsDTO) => Promise<ValidationError | null>,
   validateUpdateInventoryRecordDto: (dto: UpdateInventoryRecordDTO) => Promise<ValidationError | null>,
   validateUpdateInventoryRecordsDto: (dto: UpdateInventoryRecordsDTO) => Promise<ValidationError | null>,
};

export const configureInventoryRecordsDtosValidator =
   (inventoryRepository: InventoryRepository): InventoryRecordsDtosValidator => ({
      validateGetInventoryRecordDto: async (dto: GetInventoryRecordDTO): Promise<ValidationError | null> => {
         if (!dto.productId)
            return { error: { type: "BadRequest", message: 'Product ID required.' } };
         if (!(await inventoryRepository.exists(dto)))
            return {
               error: {
                  type: "NotFound",
                  message: `Product inventory record "${dto.productId}" not found.`,
               },
            };
         return null;
      },

      validateInventoryRecordsDto: async (dto: InventoryRecordsDTO): Promise<ValidationError | null> => {
         if (dto.filter) {
            if (dto.filter.countRange) {
               if (dto.filter.countRange.start && (dto.filter.countRange.start < 0))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid count range. Count range' +
                           ' start value must be greater than 0.',
                     },
                  };
               if (dto.filter.countRange.end && (dto.filter.countRange.end < 0))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid count range. Count range' +
                           ' end value must be greater than 0.',
                     },
                  };
               if ((dto.filter.countRange.start && dto.filter.countRange.end)
                  && (dto.filter.countRange.end < dto.filter.countRange.start))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid count range. Count range' +
                           ' end value must be greater than start value.',
                     },
                  };
            }
         }

         if (dto.timestamps) {
            if (dto.timestamps.createdAt) {
               if (dto.timestamps.createdAt.start && isNaN(Date.parse(dto.timestamps.createdAt.start)))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid createdAt start' +
                           ' date. Provide a valid ISO date string.',
                     },
                  };
               if (dto.timestamps.createdAt.end && isNaN(Date.parse(dto.timestamps.createdAt.end)))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid createdAt end' +
                           ' date. Provide a valid ISO date string.',
                     },
                  };
            }
            if (dto.timestamps.updatedAt) {
               if (dto.timestamps.updatedAt.start && isNaN(Date.parse(dto.timestamps.updatedAt.start)))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid updatedAt start' +
                           ' date. Provide a valid ISO date string.',
                     },
                  };
               if (dto.timestamps.updatedAt.end && isNaN(Date.parse(dto.timestamps.updatedAt.end)))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid updatedAt end' +
                           ' date. Provide a valid ISO date string.',
                     },
                  };
            }
         }

         if (dto.sort) {
            if (dto.sort.field && !dto.sort.order)
               return {
                  error: {
                     type: "BadRequest",
                     message: 'Invalid sort. Provide sort order.',
                  },
               };
            if (!dto.sort.field && dto.sort.order)
               return {
                  error: {
                     type: "BadRequest",
                     message: 'Invalid sort. Provide sort field.',
                  },
               };
            if (dto.sort.field !== "count")
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid sort. Sort field must be' +
                        ' "count".',
                  },
               };
            if (dto.sort.order !== "asc" && dto.sort.order !== "desc")
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid sort. Sort order must be' +
                        ' "asc" or "desc".',
                  },
               };
         }

         if (dto.page) {
            if (dto.page.index && !dto.page.limit)
               return {
                  error: {
                     type: "BadRequest",
                     message: 'Invalid page. Provide page limit.',
                  },
               };
            if (!dto.page.index && dto.page.limit)
               return {
                  error: {
                     type: "BadRequest",
                     message: 'Invalid page. Provide page index.',
                  },
               };
            if (dto.page.index < 0)
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid page. Page index must be' +
                        ' 0 or greater.',
                  },
               };
            if (dto.page.limit < 1)
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid page. Page limit must be' +
                        ' 1 or greater.',
                  },
               };
         }

         return null;
      },

      validateUpdateInventoryRecordDto: async (dto: UpdateInventoryRecordDTO): Promise<ValidationError | null> => {
         if (!dto.productId)
            return { error: { type: "BadRequest", message: 'ID required.' } };
         if (!(await inventoryRepository.exists(dto)))
            return {
               error: {
                  type: "NotFound",
                  message: `Inventory record "${dto.productId}" not found.`,
               },
            };
         if (!dto.updateFields)
            return {
               error: {
                  type: "BadRequest", message: 'Invalid request. Update field(s)' +
                     ' required.',
               },
            };
         if (dto.updateFields.newCount)
            if (dto.updateFields.newCount < 0)
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid count. Count must be' +
                        ' greater than 0.',
                  },
               };
         if (dto.updateFields.countDelta) {
            const result: InventoryRecord | Error = await inventoryRepository.getRecord({ productId: dto.productId });
            if (isError(result)) return {
               error: { type: "Internal", message: 'Repository read error.' },
            };
            if ((result.count + dto.updateFields.countDelta) < 0)
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid count delta. Not' +
                        ' enough products.',
                  },
               };
         }
         return null;
      },

      validateUpdateInventoryRecordsDto: async (dto: UpdateInventoryRecordsDTO): Promise<ValidationError | null> => {
         if (dto.filter.countRange) {
            if (dto.filter.countRange.start && (dto.filter.countRange.start < 0))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid count range. Count range' +
                        ' start value must be greater than 0.',
                  },
               };
            if (dto.filter.countRange.end && (dto.filter.countRange.end < 0))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid count range. Count range' +
                        ' end value must be greater than 0.',
                  },
               };
            if ((dto.filter.countRange.start && dto.filter.countRange.end)
               && (dto.filter.countRange.end < dto.filter.countRange.start))
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid count range. Count range' +
                        ' end value must be greater than start value.',
                  },
               };
         }

         if (dto.timestamps) {
            if (dto.timestamps.createdAt) {
               if (dto.timestamps.createdAt.start && isNaN(Date.parse(dto.timestamps.createdAt.start)))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid createdAt start' +
                           ' date. Provide a valid ISO date string.',
                     },
                  };
               if (dto.timestamps.createdAt.end && isNaN(Date.parse(dto.timestamps.createdAt.end)))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid createdAt end' +
                           ' date. Provide a valid ISO date string.',
                     },
                  };
            }
            if (dto.timestamps.updatedAt) {
               if (dto.timestamps.updatedAt.start && isNaN(Date.parse(dto.timestamps.updatedAt.start)))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid updatedAt start' +
                           ' date. Provide a valid ISO date string.',
                     },
                  };
               if (dto.timestamps.updatedAt.end && isNaN(Date.parse(dto.timestamps.updatedAt.end)))
                  return {
                     error: {
                        type: "BadRequest", message: 'Invalid updatedAt end' +
                           ' date. Provide a valid ISO date string.',
                     },
                  };
            }
         }

         if (!dto.updateFields)
            return {
               error: {
                  type: "BadRequest", message: 'Invalid request. Update field(s)' +
                     ' required.',
               },
            };
         if (dto.updateFields.newCount)
            if (dto.updateFields.newCount < 0)
               return {
                  error: {
                     type: "BadRequest", message: 'Invalid count. Count must be' +
                        ' greater than 0.',
                  },
               };
         if (dto.updateFields.countDelta)
            return {
               error: {
                  type: "BadRequest", message: 'Invalid update. Cannot update' +
                     ' multiple records with count delta.',
               },
            };

         return null;
      },
   });
