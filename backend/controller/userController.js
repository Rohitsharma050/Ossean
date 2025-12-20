import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import nodemailer, { createTransport } from "nodemailer";

//Api for register the user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.json({
        success: false,
        message: "Missing Required Fields",
      });
    }
    if (!validator.isEmail(email)) {
      res.json({
        success: false,
        message: "Invalid Email",
      });
    }
    if (password.length < 8) {
      res.json({
        success: false,
        message: "Please Enter a strong password",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(data);
    const user = await newUser.save();

    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//api for user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Missing Required Fields" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    const user = await userModel.findOne({ email }); // FIXED
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.json({ success: false, message: "Incorrect Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ================= SEND SUGGESTION =================
 const sendSuggestion = async (req, res) => {
  try {
    const { name, email, suggestion } = req.body;

    if (!suggestion) {
      return res.status(400).json({
        success: false,
        message: "Please give some suggestion",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: `"Ossean" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      replyTo: email,
      subject: "New Suggestion Received",
      html: `
        <h2>New Suggestion</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${suggestion}</p>
      `,
    });

    return res.json({
      success: true,
      message: "Suggestion sent successfully",
    });

  } catch (error) {
    console.error("SUGGESTION MAIL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Error sending your suggestion",
    });
  }
};

// ================= REPORT BUG =================
 const reportBug = async (req, res) => {
  try {
    const { name, email, report, screenshot } = req.body;

    if (!report) {
      return res.status(400).json({
        success: false,
        message: "Please write something about the bug",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: `"Ossean" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      replyTo: email,
      subject: "New Bug Report",
      html: `
        <h2>New Bug Report</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${report}</p>
      `,
      attachments: screenshot
        ? [
            {
              filename: "screenshot.png",
              content: screenshot.split("base64,")[1],
              encoding: "base64",
            },
          ]
        : [],
    });

    return res.json({
      success: true,
      message: "Bug report sent successfully",
    });

  } catch (error) {
    console.error("BUG REPORT MAIL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Error sending your report",
    });
  }
};

export { registerUser, loginUser, sendSuggestion, reportBug };
