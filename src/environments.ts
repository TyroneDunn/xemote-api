require('dotenv').config();

export const NODE_ENV: string = process.env.NODE_ENV || 'development';
export const API_TITLE: string = process.env.API_TITLE || 'xemote-api';
export const API_PORT: number = parseInt(process.env.API_PORT || '2400');
export const API_VERSION: string = process.env.API_VERSION || 'v1.0.0';
export const APP_URL: string = process.env.APP_URL || '';
export const MONGODB_URL: string = process.env.MONGO_DB_URL || '';
export const USERS_DB_NAME: string = process.env.USERS_DB_NAME || '';
export const USERS_DB_OPTION: string = process.env.USERS_DB_OPTION || '';
export const SESSION_SECRET: string = process.env.SESSION_SECRET || '';
export const PASSWORD_SALT: string = process.env.PASSWORD_SALT || '';
export const PASSWORD_LENGTH: number = parseInt(process.env.PASSWORD_LENGTH || '4');
export const HASHING_ALGORITHM: string = process.env.HASHING_ALGORITHM || '';
export const HASHING_ITERATIONS: number = parseInt(process.env.HASHING_ITERATIONS || '1');
