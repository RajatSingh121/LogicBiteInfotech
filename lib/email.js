import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'logicbite25@gmail.com',
        // In a real scenario, this should be in process.env.EMAIL_PASSWORD
        // For now, we will log if it's missing to prevent crash
        pass: process.env.EMAIL_PASSWORD || 'your-app-password-here'
    }
});

export const sendInvoiceEmail = async (to, invoiceData) => {
    try {
        const mailOptions = {
            from: '"LogicBite Accounts" <logicbite25@gmail.com>',
            to: to,
            subject: `Payment Receipt - Invoice #${invoiceData.id}`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2>Thank you for your payment!</h2>
                    <p>Dear ${invoiceData.clientName},</p>
                    <p>We have successfully received your payment of <strong>₹${invoiceData.amount}</strong> for Invoice <strong>#${invoiceData.id}</strong>.</p>
                    
                    <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3>Transaction Details</h3>
                        <p><strong>Transaction ID:</strong> ${invoiceData.transactionId}</p>
                        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                        <p><strong>Method:</strong> ${invoiceData.method}</p>
                    </div>

                    <p>You can view and download your invoice at any time using the link below:</p>
                    <p>
                        <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/billing/${invoiceData.id}" 
                           style="background: #002D62; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                           View Invoice
                        </a>
                    </p>
                    
                    <br/>
                    <p>Best Regards,</p>
                    <p><strong>LogicBite Infotech Team</strong></p>
                </div>
            `
        };

        if (!process.env.EMAIL_PASSWORD) {
            console.log('--- EMAIL SIMULATION ---');
            console.log('To:', to);
            console.log('Subject:', mailOptions.subject);
            console.log('Content Preview:', `Payment of ₹${invoiceData.amount} received.`);
            console.log('------------------------');
            return { success: true, simulated: true };
        }

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
        return { success: true, messageId: info.messageId };

    } catch (error) {
        console.error('Error sending email:', error);
        // Don't block the flow if email fails
        return { success: false, error: error.message };
    }
};
