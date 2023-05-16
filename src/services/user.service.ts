import axios from 'axios';
import lodash from 'lodash';
import logger from '../middlewares/logger.middleware';

interface User {
    username: string;
    uid: string;
}

interface UserProfile {
    userUid: string;
    address: string;
    birthdate: string;
}

export async function getUserData(username: string): Promise<User | undefined> {
    const usersResponse = await axios.get<User[]>(`${process.env.API_URL}/users.json`);
    logger.info(`Retrieving user data for ${username}`);
    return lodash.find(usersResponse.data, { username: username });
}

export async function getProfileData(userUid: string): Promise<UserProfile | undefined> {
    const profilesResponse = await axios.get<UserProfile[]>(`${process.env.API_URL}/userProfiles.json`);
    logger.info(`Retrieved profile data for ${userUid}`);
    return lodash.find(profilesResponse.data, { userUid: userUid });
}
