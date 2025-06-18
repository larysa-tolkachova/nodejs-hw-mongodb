import crypto from 'node:crypto';

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAY = 30 * 24 * 60 * 60 * 1000;

export const cryptoAccessToken = crypto.randomBytes(30).toString('base64');
export const cryptoRefreshToken = crypto.randomBytes(30).toString('base64');
