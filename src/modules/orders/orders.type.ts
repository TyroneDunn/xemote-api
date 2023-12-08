export type Orders = {
    _id: string
    clientId: string,
    cart: ProductCountPair,
    status: OrderStatus,
};

export type ProductCountPair = Record<string, number>;

export type OrderStatus = "complete" | "pending" | "cancelled";
