import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const sendEmail = async (templateParams) => {
  const response = await fetch(
    "https://api.emailjs.com/api/v1.0/email/send",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PRIVATE_KEY,
        template_params: templateParams,
      }),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    console.error("EMAILJS ERROR:", text);
    throw new Error("EmailJS failed");
  }

  console.log("EMAILJS SUCCESS:", text);
};


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

    res.json({ success: true, token });

  } catch (error) {
    res.json({ success: false, message: error.message });
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
    res.json({ success: false, message: error.message });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { googleToken } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, email_verified } = ticket.getPayload();
    if (!email_verified)
      return res.json({ success: false, message: "Email not verified" });

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        name,
        email,
        password: "__GOOGLE_USER__",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ success: true, token, user });

  } catch {
    res.json({ success: false, message: "Google login failed" });
  }
};

const sendSuggestion = async (req, res) => {
  try {
    const { name, email, suggestion } = req.body;

    if (!suggestion)
      return res.json({ success: false, message: "Suggestion required" });

    await sendEmail({
      name,
      email,
      message: suggestion,
      type: "Suggestion",
    });

    res.json({ success: true, message: "Suggestion sent" });

  } catch {
    res.json({ success: false, message: "Email failed" });
  }
};

const reportBug = async (req, res) => {
  try {
    const { name, email, report } = req.body;

    if (!report)
      return res.json({ success: false, message: "Bug details required" });

    await sendEmail({
      name,
      email,
      message: report,
      type: "Bug Report",
    });

    res.json({ success: true, message: "Bug reported" });

  } catch {
    res.json({ success: false, message: "Bug report failed" });
  }
};

export {
  registerUser,
  loginUser,
  googleLogin,
  sendSuggestion,
  reportBug,
};
