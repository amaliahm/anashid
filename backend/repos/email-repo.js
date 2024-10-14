import nodemailer from "nodemailer";
import sgTransporter from "nodemailer-sendgrid-transport";

// CONFIG
import { SMTP } from "../configs/config.js";

export default class EmailRepo {

  static transporter = nodemailer.createTransport(
    sgTransporter({
      auth: {
        api_key: SMTP.password,
      },
    })
  );

  static async sendEmail(to, subject, message, html) {
    this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
      html,
    });
  }

  static async contactEmail( message ) {
    this.transporter.sendMail(message);
  }
}