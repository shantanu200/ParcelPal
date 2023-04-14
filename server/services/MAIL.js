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
