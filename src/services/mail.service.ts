import nodemailer from 'nodemailer';

import logger from '../middlewares/logger.middleware';

/**
 * Structure of the wish request
 * @typedef {Object} WishRequest
 * @property {string} username - The user's name
 * @property {string} address - The user's address
 * @property {string} wish - The user's wish
 */
interface WishRequest {
  username: string;
  address: string;
  wish: string;
}

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
