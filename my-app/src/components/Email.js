
const nodemailer = require("nodemailer");
const html = `
  <h1>Hi there</h1>
  <p>Thanks for subscribing to my newsletter</p>`;

async function main() {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: "cebacaro@gmail.com",
    to: "cebacaro@gmail.com",
    subject: "Hello ✔",
    html: html,
  });

  console.log("Message sent: " + info.messageId);
}

main().catch((err) => console.log(err));
