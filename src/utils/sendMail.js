import nodemailer from 'nodemailer';
import { getEnvVar } from '../utils/getEnvVar.js';

//адреса поштового сервера
const transporter = nodemailer.createTransport({
  host: getEnvVar('SMTP_HOST'),
  port: getEnvVar('SMTP_PORT'),
  secure: false, // чи безпечне з'єднання
  auth: {
    user: getEnvVar('SMTP_USER'), // згенерований user
    pass: getEnvVar('SMTP_PASSWORD'), // згенерований password
  },
});

export const sendEmail = async (to, subject, html) => {
  return transporter.sendMail({
    from: getEnvVar('SMTP_FROM'),
    to,
    subject,
    html,
  });
};
//const sendEmail: (to: any, subject: any, html: any) => Promise<SMTPTransport.SentMessageInfo>
// 2️⃣  Send a message
//   transporter
//     .sendMail({
//       from: "Example app <no-reply@example.com>",
//       to: "user@example.com",
//       subject: "Hello from tests ✔",
//       text: "This message was sent from a Node.js integration test.",
//     })
//     .then((info) => {
//       console.log("Message sent: %s", info.messageId);
//       // Preview the stored message in Ethereal’s web UI
//       console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     })
//     .catch(console.error);
// });
