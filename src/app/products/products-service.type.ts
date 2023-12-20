import { RequestHandler } from "@hals/common";

export type ProductsService = {
   getProduct: RequestHandler,
   getProducts: RequestHandler,
   createProduct: RequestHandler,
   updateProduct: RequestHandler,
   updateProducts: RequestHandler,
   deleteProduct: RequestHandler,
   deleteProducts: RequestHandler,
};
