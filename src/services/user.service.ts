import axios from 'axios';
import lodash from 'lodash';
import { User } from '../interfaces/user.interface';
import { UserProfile } from '../interfaces/user-profile.interface';

import logger from '../middlewares/logger.middleware';

/**
 * Retrieves a user's data from an API
 * @param {string} username - The user's name
 * @returns {Promise<User | undefined>} The user's data, or undefined if not found
 */
export async function getUserData(username: string): Promise<User | undefined> {
  const usersResponse = await axios.get<User[]>(`${process.env.API_URL}/users.json`);
  logger.info(`Retrieving user data for ${username}`);
  return lodash.find(usersResponse.data, { username: username });
}

/**
 * Retrieves a user's profile data from an API
 * @param {string} userUid - The user's unique ID
 * @returns {Promise<UserProfile | undefined>} The user's profile data, or undefined if not found
 */
export async function getProfileData(userUid: string): Promise<UserProfile | undefined> {
  const profilesResponse = await axios.get<UserProfile[]>(`${process.env.API_URL}/userProfiles.json`);
  logger.info(`Retrieved profile data for ${userUid}`);
  return lodash.find(profilesResponse.data, { userUid: userUid });
}
