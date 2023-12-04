import {Request, Response} from "@hals/core"

export type ProductsRepository = {
    getProduct: (dto: Request) => Response,
    getProducts: (dto: Request) => Response,
    createProduct: (dto: Request) => Response,
    deleteProduct: (dto: Request) => Response,
    updateProduct: (dto: Request) => Response,
    exists: (dto: Request) => boolean,
};
