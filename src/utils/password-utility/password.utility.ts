import {GenerateSalt, HashUtility} from "./password.type";
import crypto from "crypto";

export const hashUtility = (
    salt: string,
    iterations: number,
    length: number,
    algorithm: string
): HashUtility => ({
    generateHash: (password: string): string =>
        crypto.pbkdf2Sync(password, salt, iterations, length, algorithm).toString('hex'),

    validateHash: (password: string, hash: string): boolean =>
        (hash === crypto.pbkdf2Sync(password, salt, iterations, length, algorithm).toString('hex')),
});

export const generateSalt: GenerateSalt = (): string => crypto.randomBytes(256).toString('hex');
