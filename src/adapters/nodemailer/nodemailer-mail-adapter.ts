import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "./../mail-adapter";

export const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "36efced283b5ac",
    pass: "df957c1639842f",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <eu@eu.com>",
      to: "Rafael Barros <rafinha041barros@gmail.com>",
      subject: subject,
      html: body,
    });
  }
}
