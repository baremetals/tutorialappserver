import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string, subject: string) {

  let transporter = nodemailer.createTransport({
    host: process.env.EMAILSERVER,
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USERNAME, // generated ethereal user
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Baremetals" <admin@baremetals.co.uk>', // sender address
    to: to,
    html,
    subject: subject,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
