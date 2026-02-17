import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  mongoUri: string;
  jwtSecret: string;
  env: string;
}

export const config: Config = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce_api',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  env: process.env.NODE_ENV || 'development',
};
