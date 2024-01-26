import { Controller, Method, RequestHandler } from "@hals/common";
import { ProductsService } from "./products.service";

const getProductsMethod = (getProducts : RequestHandler) : Method => ({
   type           : "GET",
   queryParamKeys : ProductsQueryParamKeys,
   requestHandler : getProducts,
});

const getProductMethod = (getProduct : RequestHandler) : Method => ({
   type           : "GET",
   paramKeys      : [ ID ],
   requestHandler : getProduct,
});

const createProductMethod = (createProduct : RequestHandler) : Method => ({
   type           : "POST",
   requestHandler : createProduct,
});

const updateProductsMethod = (updateProducts : RequestHandler) : Method => ({
   type           : "PATCH",
   queryParamKeys : ProductsQueryParamKeys,
   requestHandler : updateProducts,
});

const updateProductMethod = (updateProduct : RequestHandler) : Method => ({
   type           : "PATCH",
   paramKeys      : [ ID ],
   requestHandler : updateProduct,
});

const deleteProductsMethod = (deleteProducts : RequestHandler) : Method => ({
   type           : "DELETE",
   queryParamKeys : ProductsQueryParamKeys,
   requestHandler : deleteProducts,
});

const deleteProductMethod = (deleteProduct : RequestHandler) : Method => ({
   type           : "DELETE",
   paramKeys      : [ ID ],
   requestHandler : deleteProduct,
});

const ID : string = 'id';

const ProductsQueryParamKeys : string[] = [
   'name',
   'nameRegex',
   'category',
   'categoryRegex',
   'costPriceRange',
   'price',
   'markupRange',
   'createdAt',
   'updatedAt',
   'sort',
   'order',
   'index',
   'limit',
];

export const ProductsController = (service : ProductsService) : Controller => ({
   path    : 'products/',
   guard   : false,
   methods : [
      getProductsMethod(service.getProducts),
      // getProductMethod(service.getProduct),
      // createProductMethod(service.createProduct),
      // updateProductsMethod(service.updateProducts),
      // updateProductMethod(service.updateProduct),
      // deleteProductsMethod(service.deleteProducts),
      // deleteProductMethod(service.deleteProduct),
   ],
});
