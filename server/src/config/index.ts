import { config } from 'dotenv';
import { object, string } from 'zod';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const schema = object({
  NODE_ENV: string({ required_error: 'NODE_ENV is required' }).min(1),
  PORT: string({ required_error: 'PORT is required' }).min(1),
  ADDRESS: string().default('0.0.0.0'),
  ACCESS_TOKEN_SECRET: string({
    required_error: 'ACCESS_TOKEN_SECRET is required',
  }).min(1),
  ACCESS_TOKEN_EXPIRY: string({
    required_error: 'ACCESS_TOKEN_EXPIRY is required',
  }).min(1),
  REFRESH_TOKEN_SECRET: string({
    required_error: 'REFRESH_TOKEN_SECRET is required',
  }).min(1),
  REFRESH_TOKEN_EXPIRY: string({
    required_error: 'REFRESH_TOKEN_EXPIRY is required',
  }).min(1),
  MONGODB_URI: string({ required_error: 'MONGODB_URI is required' }).min(1),
  CORS_ORIGIN: string({ required_error: 'CORS_ORIGIN is required' }).min(1),
});

const env = schema.parse(process.env);

export const {
  NODE_ENV,
  PORT,
  ADDRESS,
  CORS_ORIGIN,
  MONGODB_URI,
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
} = env;
