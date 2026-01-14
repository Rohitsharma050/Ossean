import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.json({ success: false, message: "Missing Required Fields" });

    if (!validator.isEmail(email))
      return res.json({ success: false, message: "Invalid Email" });

    if (password.length < 8)
      return res.json({ success: false, message: "Please enter a strong password" });

    const exists = await userModel.findOne({ email });
    if (exists)
      return res.json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

   return res.json({ success: true, token });

  } catch (error) {
   return  res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.json({ success: false, message: "Missing Required Fields" });

    if (!validator.isEmail(email))
      return res.json({ success: false, message: "Invalid Email" });

    const user = await userModel.findOne({ email });
    if (!user || !user.password)
      return res.json({ success: false, message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.json({ success: false, message: "Incorrect Password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });

  } catch (error) {
   return res.json({ success: false, message: error.message });
  }
};
export {
  registerUser,
  loginUser,
};
