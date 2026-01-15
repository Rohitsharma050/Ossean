import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { upload } from "../middleware/multer.js"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async ({ subject, html, attachment }) => {
  await resend.emails.send({
    from: "Ossean <onboarding@resend.dev>",
    to: ["rohitsharmasa120111@gmail.com"],
    subject,
    html,
    attachments: attachment
      ? [
          {
            filename: attachment.originalname,
            content: attachment.buffer
          }
        ]
      : []
  })
}

export const sendSuggestion = async (req,res)=>{
   const { name, email, message } = req.body

  if (!message)
    return res.json({ success: false, message: "Message required" })

  await sendEmail({
    subject: "New Suggestion",
    html: `
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Suggestion:</b> ${message}</p>
    `
  })

  res.json({ success: true, message: "Suggestion sent" })
}

//------BUG REPORT-------


export const bugReport = async (req,res)=>{
 const { name, email, report } = req.body

  if (!report)
    return res.json({ success: false, message: "Bug report required" })

  if (req.file && !req.file.mimetype.startsWith("image/")) {
    return res.json({ success: false, message: "Only images allowed" })
  }

  await sendEmail({
    subject: "New Bug Report",
    html: `
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Bug:</b> ${report}</p>
    `,
    attachment: req.file || null
  })

  res.json({ success: true, message: "Bug reported successfully" })

}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.json({ success: false, message: "Missing fields" });

    const exists = await userModel.findOne({ email });
    if (exists)
      return res.json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      authProvider: "local"
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user)
      return res.json({ success: false, message: "Invalid credentials" });

    // 🔴 IMPORTANT
    if (user.authProvider === "google")
      return res.json({
        success: false,
        message: "Please login using Google"
      });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const { name, email } = ticket.getPayload();

    let user = await userModel.findOne({ email });

    // 🟢 NEW USER (Google)
    if (!user) {
      user = await userModel.create({
        name,
        email,
        authProvider: "google"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token });

  } catch (err) {
    console.error("Google login error:", err.message);
    res.status(401).json({
      success: false,
      message: "Google login failed"
    });
  }
};


