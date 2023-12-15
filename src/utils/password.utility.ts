import {
    HASHING_ALGORITHM,
    HASHING_ITERATIONS,
    PASSWORD_LENGTH,
    PASSWORD_SALT
} from "../environment";
const crypto = require('crypto');

const encrypt = (password: string): string =>
    crypto.pbkdf2Sync(
        password,
        PASSWORD_SALT,
        HASHING_ITERATIONS,
        PASSWORD_LENGTH,
        HASHING_ALGORITHM
    ).toString('hex');

export const generateHash = (password: string): string => 
    encrypt(password);

export const validateHash = (password: string, hash: string): boolean =>
    hash === encrypt(password);

export const generateSalt = () => crypto.randomBytes(256).toString('hex');
