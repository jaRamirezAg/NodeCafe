import { Schema, model } from "mongoose";

const roleSchema = Schema({
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});

const Role = model("Role", roleSchema);
export default Role;
