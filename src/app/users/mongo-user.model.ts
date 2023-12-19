import { Document, Schema } from 'mongoose';
import { User } from "./user.type";
import database from "../../database/mongodb.config";
import { USERS_DB_NAME } from "../../environments";

interface UserDocument extends Document, User {
   _id: string,
   username: string,
   hash: string,
}

const userSchema = new Schema<UserDocument>({
   username: {
      type: String,
      unique: true,
      required: true,
   },
   hash: {
      type: String,
      required: true,
   },
});

const UserModel = database.model<UserDocument>(USERS_DB_NAME, userSchema);
export default UserModel;