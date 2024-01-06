import { describe } from 'node:test';
import { deleteRecords } from '../../../src/app/products/products.utility';
import { Product } from '../../../src/app/products/products.type';
import { DeleteRecord } from '../../../src/app/inventory/inventory-repository.type';
import { CommandResult } from '@hals/common';
import createSpy = jasmine.createSpy;

describe('Delete Records Suite', () => {
   describe('When given a large input', () => {
      it('should not reach heap limit', () => {
         const functionNotThrowingError = () => {
            const productInitializer = () : Product => ({
               _id: '1',
                  category: 'Wireless AC Current Meter',
                  name: 'stub product',
                  markup: 20,
                  costPrice: {price: 100, currency: 'USD'}
            });

            const createArray = <T>(length: number, initializer: () => T): T[] =>
               Array.from({ length }, initializer);

            const arrayLength : number = 10000;
            const largeArray: Product[] = createArray<Product>(arrayLength, productInitializer)

            const deleteRecord: DeleteRecord = createSpy('mockDeleteRecord').and.resolveTo(CommandResult(true, 1));
            deleteRecords(largeArray, deleteRecord, []);
         };

         try {
            functionNotThrowingError();
         }
         catch (e) {
            fail('Expected to not throw error, but it did.');
         }

         expect(functionNotThrowingError).not.toThrowError();
      //    Appears only to be able to handle ~10000 records at a time. Any more and
      //    program terminates with a 'Reached heap limit' error.
      });
   });
});
