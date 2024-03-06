export const DB_NAME = 'innohacks-backend';

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};
