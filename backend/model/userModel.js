import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    default: null
  },

  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local"
  }
}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);
export default userModel;
