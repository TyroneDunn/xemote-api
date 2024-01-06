import {
   GetInventoryRecordRequest,
   InventoryRecord,
   InventoryRecordsRequest,
   UpdateInventoryRecordRequest,
   UpdateInventoryRecordsRequest,
} from "./inventory-records.type";
import { InventoryRepository } from "./inventory-repository.type";
import { Error, isError, ValidationError } from "@hals/common";

export type InventoryRecordsValidator = {
   validateGetInventoryRecordRequest: (dto: GetInventoryRecordRequest) => Promise<ValidationError | null>,
   validateInventoryRecordsRequest: (dto: InventoryRecordsRequest) => Promise<ValidationError | null>,
   validateUpdateInventoryRecordRequest: (dto: UpdateInventoryRecordRequest) => Promise<ValidationError | null>,
   validateUpdateInventoryRecordsRequest: (dto: UpdateInventoryRecordsRequest) => Promise<ValidationError | null>,
};

export const InventoryRecordsValidator =
   (inventoryRepository: InventoryRepository): InventoryRecordsValidator => ({
      validateGetInventoryRecordRequest: async (dto: GetInventoryRecordRequest): Promise<ValidationError | null> => {
         if (!dto.productId)
            return ValidationError("BadRequest", 'Product ID required.');

         if (!(await inventoryRepository.exists(dto)))
            return ValidationError("NotFound",
               `Product inventory record "${dto.productId}" not found.`);

         return null;
      },

      validateInventoryRecordsRequest: async (dto: InventoryRecordsRequest): Promise<ValidationError | null> => {
         if (dto.filter) {
            if (dto.filter.countRange) {
               if (dto.filter.countRange.start && (dto.filter.countRange.start < 0))
                  return ValidationError("BadRequest", 'Invalid count range. Count range' +
                           ' start value must be greater than 0.');

               if (dto.filter.countRange.end && (dto.filter.countRange.end < 0))
                  return ValidationError("BadRequest", 'Invalid count range. Count range' +
                           ' end value must be greater than 0.');

               if ((dto.filter.countRange.start && dto.filter.countRange.end)
                  && (dto.filter.countRange.end < dto.filter.countRange.start))
                  return ValidationError("BadRequest", 'Invalid count range. Count range' +
                           ' end value must be greater than start value.');
            }
         }

         if (dto.timestamps) {
            if (dto.timestamps.createdAt) {
               if (dto.timestamps.createdAt.start && isNaN(Date.parse(dto.timestamps.createdAt.start)))
                  return ValidationError("BadRequest", 'Invalid createdAt start' +
                           ' date. Provide a valid ISO date string.');

               if (dto.timestamps.createdAt.end && isNaN(Date.parse(dto.timestamps.createdAt.end)))
                  return ValidationError("BadRequest", 'Invalid createdAt end' +
                           ' date. Provide a valid ISO date string.');
            }

            if (dto.timestamps.updatedAt) {
               if (dto.timestamps.updatedAt.start && isNaN(Date.parse(dto.timestamps.updatedAt.start)))
                  return ValidationError("BadRequest", 'Invalid updatedAt start' +
                           ' date. Provide a valid ISO date string.');

               if (dto.timestamps.updatedAt.end && isNaN(Date.parse(dto.timestamps.updatedAt.end)))
                  return ValidationError("BadRequest", 'Invalid updatedAt end' +
                           ' date. Provide a valid ISO date string.');
            }
         }

         if (dto.sort) {
            if (dto.sort.field && !dto.sort.order)
               return ValidationError("BadRequest", 'Invalid sort. Provide sort order.');

            if (!dto.sort.field && dto.sort.order)
               return ValidationError("BadRequest", 'Invalid sort. Provide sort field.');

            if (dto.sort.field !== "count")
               return ValidationError("BadRequest", 'Invalid sort. Sort field must be' +
                        ' "count".');

            if (dto.sort.order !== "asc" && dto.sort.order !== "desc")
               return ValidationError("BadRequest", 'Invalid sort. Sort order must be' +
                        ' "asc" or "desc".');
         }

         if (dto.page) {
            if (dto.page.index && !dto.page.limit)
               return ValidationError("BadRequest", 'Invalid page. Provide page limit.');

            if (!dto.page.index && dto.page.limit)
               return ValidationError("BadRequest",
                     'Invalid page. Provide page index.');

            if (dto.page.index < 0)
               return ValidationError("BadRequest", 'Invalid page. Page index must be' +
                        ' 0 or greater.');

            if (dto.page.limit < 1)
               return ValidationError("BadRequest", 'Invalid page. Page limit must be' +
                        ' 1 or greater.');
         }

         return null;
      },

      validateUpdateInventoryRecordRequest: async (dto: UpdateInventoryRecordRequest): Promise<ValidationError | null> => {
         if (!dto.productId)
            return ValidationError("BadRequest", 'ID required.');

         if (!(await inventoryRepository.exists(dto)))
            return ValidationError("NotFound",
                  `Inventory record "${dto.productId}" not found.`);

         if (!dto.updateFields)
            return ValidationError("BadRequest", 'Invalid request. Update field(s)' +
                     ' required.');

         if (dto.updateFields.newCount)
            if (dto.updateFields.newCount < 0)
               return ValidationError("BadRequest", 'Invalid count. Count must be' +
                        ' greater than 0.');

         if (dto.updateFields.countDelta) {
            const result: InventoryRecord | Error = await inventoryRepository.getRecord({ productId: dto.productId });
            if (isError(result)) return ValidationError("Internal", 'Repository read' +
            ' error.');

            if ((result.count + dto.updateFields.countDelta) < 0)
               return ValidationError("BadRequest", 'Invalid count delta. Not' +
                        ' enough products.');
         }
         return null;
      },

      validateUpdateInventoryRecordsRequest: async (dto: UpdateInventoryRecordsRequest): Promise<ValidationError | null> => {
         if (dto.filter.countRange) {
            if (dto.filter.countRange.start && (dto.filter.countRange.start < 0))
               return ValidationError("BadRequest", 'Invalid count range. Count range' +
                        ' start value must be greater than 0.');

            if (dto.filter.countRange.end && (dto.filter.countRange.end < 0))
               return ValidationError("BadRequest", 'Invalid count range. Count range' +
                        ' end value must be greater than 0.');

            if ((dto.filter.countRange.start && dto.filter.countRange.end)
               && (dto.filter.countRange.end < dto.filter.countRange.start))
               return ValidationError("BadRequest", 'Invalid count range. Count range' +
                        ' end value must be greater than start value.');
         }

         if (dto.timestamps) {
            if (dto.timestamps.createdAt) {
               if (dto.timestamps.createdAt.start && isNaN(Date.parse(dto.timestamps.createdAt.start)))
                  return ValidationError("BadRequest", 'Invalid createdAt start' +
                           ' date. Provide a valid ISO date string.');

               if (dto.timestamps.createdAt.end && isNaN(Date.parse(dto.timestamps.createdAt.end)))
                  return ValidationError("BadRequest", 'Invalid createdAt end' +
                           ' date. Provide a valid ISO date string.');
            }

            if (dto.timestamps.updatedAt) {
               if (dto.timestamps.updatedAt.start && isNaN(Date.parse(dto.timestamps.updatedAt.start)))
                  return ValidationError("BadRequest", 'Invalid updatedAt start' +
                           ' date. Provide a valid ISO date string.');

               if (dto.timestamps.updatedAt.end && isNaN(Date.parse(dto.timestamps.updatedAt.end)))
                  return ValidationError("BadRequest", 'Invalid updatedAt end' +
                           ' date. Provide a valid ISO date string.');
            }
         }

         if (!dto.updateFields)
            return ValidationError("BadRequest", 'Invalid request. Update field(s)' +
                     ' required.');

         if (dto.updateFields.newCount)
            if (dto.updateFields.newCount < 0)
               return ValidationError("BadRequest", 'Invalid count. Count must be' +
                        ' greater than 0.');

         if (dto.updateFields.countDelta)
            return ValidationError("BadRequest", 'Invalid update. Cannot update' +
                     ' multiple records with count delta.');

         return null;
      },
   });
