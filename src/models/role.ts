import { Schema, model } from "mongoose";

interface IRole {
  role: string;
}

const roleSchema = new Schema<IRole>({
  role: { type: String },
});

const Role = model<IRole>("roles", roleSchema);

export default Role;