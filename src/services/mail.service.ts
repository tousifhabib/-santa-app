import nodemailer from 'nodemailer';

import { WishRequest } from '../interfaces/wish-request.interface';
import logger from '../middlewares/logger.middleware';

/**
 * Sends an email containing the requests in the requestList
 * @param {WishRequest[]} requestList - List of user requests
 * @returns {Promise<any>} The result of the sendMail operation
 */
export async function sendMail(requestList: WishRequest[]): Promise<any> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const emailContent = requestList.map(request => {
    return `
      Child name: ${request.username}
      Child address: ${request.address}
      Child request: ${request.wish}
    `;
  }).join('\n\n');

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    subject: 'Request List',
    text: emailContent,
  };

  const result = await transporter.sendMail(mailOptions);
  logger.info(`Sent mail with result ${result}`);
  return result;
}
