import * as path from 'path';
import cron from 'node-cron';

import { Request, Response } from 'express';

import { getUserData, getProfileData } from '../services/user.service';
import { sendMail } from '../services/mail.service';
import { calculateAge } from '../utils/calculateAge.util';
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

const requestList: WishRequest[] = [];

cron.schedule('*/15 * * * * *', async () => {
  if (requestList.length > 0) {
    await sendMail(requestList);
    requestList.length = 0;
  }
});

/**
 * Processes a user's wish request
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function submitRequest(req: Request, res: Response): Promise<void> {
  try {
    const user = await getUserData(req.body.userid);
    if (!user) {
      logger.warn(`User not found: ${req.body.userid}`);
      res.status(400).sendFile(path.join(__dirname, '../../views/error/user-not-registered.html'));
      return;
    }

    const profile = await getProfileData(user.uid);
    if (!profile) {
      logger.warn(`Profile not found for user: ${user.uid}`);
      res.status(400).sendFile(path.join(__dirname, '../../views/error/no-profile-found.html'));
      return;
    }

    if (calculateAge(profile.birthdate) > 10) {
      logger.warn(`User is older than 10 years: ${user.uid}`);
      res.status(400).sendFile(path.join(__dirname, '../../views/error/age-greater-than-10.html'));
      return;
    }

    requestList.push({
      username: user.username,
      address: profile.address,
      wish: req.body.wish,
    });

    logger.info(`Request received from user: ${user.username}, wish: ${req.body.wish}`);
    res.sendFile(path.join(__dirname, '../../views/request-received.html'));
  } catch (error) {
    logger.error(`Error processing request: ${(error as Error).message}`);
    res.status(500).send((error as Error).message);
  }
}
