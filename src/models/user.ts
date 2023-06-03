import { Schema, Types, model } from "mongoose";

interface IUser {
  name: string;
  surname: string;
  gender: number;
  birthday: Date;
  phone: number;
  email: string;
  address: string;
  password: string;
  token: string;
  role_id: Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  name: { type: String },
  surname: { type: String },
  gender: { type: Number },
  birthday: { type: Date },
  phone: { type: Number },
  email: { type: String, required: true },
  address: { type: String },
  password: { type: String, required: true },
  token: { type: String },
  role_id: { type: Schema.Types.ObjectId },
});

const User = model<IUser>("users", userSchema);

export default User;