import nodemailer from 'nodemailer';
import { getEnvVar } from '../utils/getEnvVar.js';

//адреса поштового сервера
const transport = nodemailer.createTransport({
  host: getEnvVar('SMTP_HOST'),
  port: getEnvVar('SMTP_PORT'),
  secure: false, // чи безпечне з'єднання
  auth: {
    user: getEnvVar('SMTP_USER'), // згенерований user
    pass: getEnvVar('SMTP_PASSWORD'), // згенерований password
  },
});

export const sendEmail = async (to, subject, html) => {
  return transport.sendMail({
    from: getEnvVar('SMTP_FROM'),
    to,
    subject,
    html,
  });
};
//const sendEmail: (to: any, subject: any, html: any) => Promise<SMTPTransport.SentMessageInfo>
