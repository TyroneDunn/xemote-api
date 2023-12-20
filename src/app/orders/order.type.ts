export type Order = {
   _id: string
   clientId: string,
   cart: ProductCount,
   status: OrderStatus,
};

export type ProductCount = Record<string, number>;

export type OrderStatus = "complete" | "pending" | "cancelled";
