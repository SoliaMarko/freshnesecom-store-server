import {genSalt, hash} from 'bcryptjs';

export async function hashPassword(password: string) {
  const SALT = await genSalt();
  return hash(password, SALT);
}
