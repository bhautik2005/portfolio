// import nodemailer from 'nodemailer';
// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);
// const sendContactEmail = async ({ name, email, subject, message }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.verify();
//     console.log('✅ SMTP Ready');

//     await transporter.sendMail({
//       from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER,
//       replyTo: email,
//       subject: `📩 ${subject}`,
//       html: `
//         <h2>New Message 🚀</h2>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Subject:</b> ${subject}</p>
//         <p><b>Message:</b></p>
//         <p>${message}</p>
//       `,
//     });

//     console.log('✅ Email sent successfully');
//   } catch (error) {
//     console.error('❌ Email Error:', error);
//     throw error;
//   }
// };

// export default sendContactEmail;
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendContactEmail = async ({ name, email, subject, message }) => {
  try {
    console.log("📧 Sending email via Resend...");

    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // default sender (works instantly)
      to: process.env.EMAIL_USER,    // your email
      subject: `📩 ${subject}`,
      reply_to: email,               // allow replying to user
      html: `
        <h2>New Message 🚀</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    console.log("✅ Email sent via Resend:", response);

  } catch (error) {
    console.error("❌ Email Error:", error);
    throw error;
  }
};

export default sendContactEmail;