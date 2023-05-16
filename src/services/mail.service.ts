import nodemailer from 'nodemailer';
import logger from '../middlewares/logger.middleware';

interface WishRequest {
    username: string;
    address: string;
    wish: string;
}

export async function sendMail(requestList: WishRequest[]): Promise<any> {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    let emailContent = requestList.map(request => {
        return `
      Child name: ${request.username}
      Child address: ${request.address}
      Child request: ${request.wish}
    `;
    }).join('\n\n');

    let mailOptions = {
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_TO,
        subject: 'Request List',
        text: emailContent
    };

    const result = await transporter.sendMail(mailOptions);
    logger.info(`Sent mail with result ${result}`);
    return result;
}
