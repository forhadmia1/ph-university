import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  defaultPass: process.env.DEFAULT_PASS,
  bcrypt_salt_rounds: process.env.SALT_ROUND,
};
