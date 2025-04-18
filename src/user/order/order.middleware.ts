import nodemailer from "nodemailer";
// console.log("dwarkeshap@gmail.com");

const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail", // Use your email provider
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASSWORD  // Your email password or App Password
            }
        });

        await transporter.sendMail({
            from: `"E-Commerce" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        });

        console.log(`📧 Email sent to ${to}`);
    } catch (error) {
        return error
    }
};

export default sendEmail;