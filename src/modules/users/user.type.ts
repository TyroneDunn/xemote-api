import {UserPermissions} from "./user-permissions.type";

export type User = {
    _id: string,
    username: string,
    hash: string,
    firstName: string,
    lastName: string,
    permissions: UserPermissions[],
    dateCreated: Date,
    lastUpdated: Date,
};
