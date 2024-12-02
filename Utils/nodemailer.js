import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

// Nodemailer function
const sendClientQueryEmail = async (clientData) => {
    const { name, email, phone, description } = clientData;

    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Replace with your email service
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password or app-specific password
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to:'Sophisticatedecor6@gmail.com', // Your email to receive queries
            subject: `New Client Query from ${name}`,
            html: `
                <h1>New Client Inquiry</h1>
                <p><strong>Name:</strong> ${name || "New Costumer"}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || "NAN"}</p>
                <p><strong>Description:</strong></p>
                <p>${description}</p>
            `,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log(`Email sent: ${info.response}`);
        return { success: true, message: 'Email sent successfully!' };
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        return { success: false, message: 'Failed to send email.' };
    }
};

export default sendClientQueryEmail;
