import nodemailer from "nodemailer";
import { SMTP } from "../configs/config.js";
import sgTransporter from "nodemailer-sendgrid-transport";

export default class EmailRepo {
  //   static transporter = nodemailer.createTransport({
  //     host: SMTP.host,
  //     port: SMTP.port,
  //     auth: {
  //       user: SMTP.username,
  //       pass: SMTP.password,
  //     },
  //   });

  static transporter = nodemailer.createTransport(
    sgTransporter({
      auth: {
        api_key: SMTP.password,
      },
    })
  );

  static async sendEmail(to, subject, message) {
    this.transporter.sendMail({
      from: "a.ghandouz@esi-sba.dz",
      to,
      subject,
      text: message,
    });
  }
}
