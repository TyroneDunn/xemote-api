import {
    HASHING_ALGORITHM,
    HASHING_ITERATIONS,
    PASSWORD_LENGTH,
    PASSWORD_SALT
} from "../../environment";
import {GenerateHash, GenerateSalt, HashUtility, ValidateHash} from "./password.type";

const crypto = require('crypto');

const encrypt = (password: string): string =>
    crypto.pbkdf2Sync(
        password,
        PASSWORD_SALT,
        HASHING_ITERATIONS,
        PASSWORD_LENGTH,
        HASHING_ALGORITHM
    ).toString('hex');

export const generateHash: GenerateHash = (password: string): string =>
    encrypt(password);

export const validateHash: ValidateHash = (password: string, hash: string): boolean =>
    hash === encrypt(password);

export const generateSalt: GenerateSalt = (): string => crypto.randomBytes(256).toString('hex');


export const hashUtility = (
    salt: string,
    iterations: number,
    length: number,
    algorithm: string
): HashUtility => ({
    generateHash: generateHash,
    validateHash: validateHash,
})