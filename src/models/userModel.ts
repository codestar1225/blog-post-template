import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  userName: String,
  picture: String,
});

const User = models.User || model("User", userSchema);
export default User;
