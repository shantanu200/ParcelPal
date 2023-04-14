import dotenv from "dotenv";
dotenv.config();

export const MAIL_SETTINGS = {
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
};
