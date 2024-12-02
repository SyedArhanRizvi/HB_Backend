import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

const sendOwnerReplyEmail = async (userEmail, clientName) => {
    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service
            auth: {
                user: process.env.EMAIL_USER, // Owner's email
                pass: process.env.EMAIL_PASS, // Owner's email password
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER, // Owner's email
            to: userEmail, // Client's email
            subject: `Thank You for Your Inquiry, ${clientName}!`,
            html: `
                <h1>Hello ${clientName},</h1>
                <p>Thank you for reaching out to <strong>Interior Decor Solutions</strong>. We're thrilled to help you with your home decor needs!</p>
                
                <h2>About Our Services:</h2>
                <ul>
                    <li>Custom home and office design</li>
                    <li>Furniture selection and placement</li>
                    <li>Color consultation and space planning</li>
                    <li>Complete renovation support</li>
                </ul>
                
                <h2>Contact Us:</h2>
                <p><strong>Owner:</strong> Syed Haider Ali</p>
                <p><strong>Email:</strong>Sophisticatedecor6@gmail.com</p>
                <p><strong>Phone:</strong> +91-8791551332, +91-9871364655</p>
                <p><strong>Office Address:</strong> Street G1, Near Jasola Metro, Jasola Vihar, New Delhi</p>
                
                <p>Feel free to reply to this email or call us if you have more questions. We look forward to working with you!</p>
                
                <p>Best Regards,</p>
                <p><strong>Sephesticate Decor</strong></p>
            `,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log(`Reply email sent to client: ${info.response}`);
        return { success: true, message: 'Reply email sent successfully!' };
    } catch (error) {
        console.error(`Error sending reply email: ${error.message}`);
        return { success: false, message: 'Failed to send reply email.' };
    }
};

export default sendOwnerReplyEmail;
