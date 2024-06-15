import { config } from "dotenv";

config();

export const port = parseInt(process.env.PORT, 10);
export const cachePath = process.env.CACHE_PATH;
export const cacheTtlDays = parseInt(process.env.CACHE_TTL_DAYS, 10);
export const cacheMaxFiles = parseInt(process.env.CACHE_MAX_FILES, 10);
