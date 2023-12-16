export type Response<T> = {
    collection: T[],
    count: number,
    page?: number,
    limit?: number,
};
