import { config } from "dotenv";

config();

export const port = parseInt(process.env.PORT, 10);
export const cacheExplained = parseInt(process.env.CACHE_EXP, 10);
export const mongoUri = process.env.MONGO;
