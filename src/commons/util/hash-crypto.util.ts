import { pbkdf2Sync, randomBytes } from 'crypto';

export const getSalt = () => {
  return randomBytes(16).toString('hex'); // 랜덤 salt 값 생성
};

export const hashCrypto = async (string: string, salt: string): Promise<string> => {
  return await setHashSync(string, salt);
};

export const verifyString = async (hash: string, salt: string, string: string): Promise<boolean> => {
  const verifyHash = await setHashSync(string, salt);
  return verifyHash === hash ? true : false;
};

const setHashSync = async (string: string, salt: string) => {
  return await pbkdf2Sync(string, salt, 100000, 64, 'sha512').toString('hex');
};
