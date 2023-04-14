import nodemailer from "nodemailer";

import { MAIL_SETTINGS } from "../constants/constants.js";

const transporter = nodemailer.createTransport(MAIL_SETTINGS);

export async function createCompanyMail(params) {
  try {
    let mail = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to,
      subject: "Thank you for registering your company with ParcelPal",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
    <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
      <h1 style="color: #222222; font-size: 24px; margin: 0 0 20px;">Welcome to ParcelPal!</h1>
      <p style="color: #222222; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
        Thank you for choosing to register your company with us. We are excited to have you on board and can't wait to see what you accomplish.
      </p>
      <p style="color: #222222; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
        To get started, please login to your account using the credentials you created during registration. If you have any questions or concerns, please don't hesitate to contact us at [company email address].
      </p>
      <p style="color: #222222; font-size: 16px; line-height: 1.5; margin: 0;">
        Best regards,<br>
        The ParcelPal Team
      </p>
    </div>
  </div>
        `,
    });
    return mail;
  } catch (error) {
    return false;
  }
}

export async function sendMail(params) {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to,
      subject: "Hello ✅",
      html: `
        <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the club.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
        <p style="margin-top:50px;">If you do not request for verification please do not respond to the mail. You can in turn un subscribe to the mailing list and we will never bother you again.</p>
      </div>`,
    });

    return info;
  } catch (err) {
    return false;
  }
}
