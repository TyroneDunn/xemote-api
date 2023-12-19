import { Document, Schema } from 'mongoose';
import { User } from "./user.type";
import database from "../../database/mongodb.config";
import { UserPermissions } from "./user-permissions.type";

interface UserDocument extends Document, User {
    _id: string,
    username: string,
    hash: string,
    permissions: UserPermissions[],
    dateCreated: Date,
    lastUpdated: Date,
}

const userSchema = new Schema<UserDocument>({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    permissions: {
        type: [String],
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
    },
    lastUpdated: {
        type: Date,
        required: true,
    },
});

const UserModel = database.model<UserDocument>('User', userSchema);
export default UserModel;