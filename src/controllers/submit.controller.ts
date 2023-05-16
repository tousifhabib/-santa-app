import * as path from 'path';

import { Request, Response } from 'express';

import { getUserData, getProfileData } from '../services/user.service';
import { calculateAge } from '../utils/calculateAge.util';
import logger from '../middlewares/logger.middleware';

interface WishRequest {
  username: string;
  address: string;
  wish: string;
}

const requestList: WishRequest[] = [];

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