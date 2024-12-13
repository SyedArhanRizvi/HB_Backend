import sendClientQueryEmail from "../Utils/nodemailer.js";
import sendOwnerReplyEmail from "../Utils/reply.nodemailer.js";
export const quarryViaMailSendingController = async (req, res)=>{
    const { name, email, phone, description } = req.body;
    console.log( name, email, phone, description);
    
    try {
        if (!name || !email || !phone || !description) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }
        const result = await sendClientQueryEmail({ name, email, phone, description });
       if (result.success) {
        const clientReplyResult = await sendOwnerReplyEmail(email, name);
        if(clientReplyResult.success) {
            console.log("Greet message has send sent", clientReplyResult.success);
        }
       return res.status(200).json({ success: true, message: 'Query sent successfully!' });
    }
    } catch (error) {
        console.log("There are some errors in your quarry send via mail controller plz fix the bug first ", error);
       return res.status(500).json({message:"There are some errors in your quarry send via mail controller plz fix the bug first ", error});
    }
}
export const sendQuarryViaFooterMail = async (req, res)=>{
    const {email, description} = req.body;
    console.log("Mail hit");
    
    try {
        if (!email || !description) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }
        const result = await sendClientQueryEmail({email, description });
       if (result.success) {
        const clientReplyResult = await sendOwnerReplyEmail(email);
        if(clientReplyResult.success) {
            console.log("Greet message has send sent", clientReplyResult.success);
        }
       return res.status(200).json({ success: true, message: 'Query sent successfully!' });
    }
    } catch (error) {
        
    }
}
export const setMeetingSchedule = async (req, res)=>{
    const { name, email, phone, slot } = req.body;
    console.log( name, email, phone, slot);
    try {
        if (!name || !email || !phone || !slot) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }
        const result = await sendClientQueryEmail({ name, email, phone, slot });
       if (result.success) {
        const clientReplyResult = await sendOwnerReplyEmail(email, name);
        if(clientReplyResult.success) {
            console.log("Greet message has send sent", clientReplyResult.success);
        }
       return res.status(200).json({ success: true, message: 'Query sent successfully!' });
    }
    } catch (error) {
        console.log("There are some errors in your quarry send via mail controller plz fix the bug first ", error);
       return res.status(500).json({message:"There are some errors in your quarry send via mail controller plz fix the bug first ", error});
    }
}