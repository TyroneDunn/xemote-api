import {UserPermissions} from "./user-permissions.type";

export type User = {
    _id: string,
    username: string,
    hash: string,
    dateCreated: Date,
    lastUpdated: Date,
    permissions: UserPermissions[],
};
