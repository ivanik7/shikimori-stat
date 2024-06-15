import fs from "fs/promises";
import fsClassic from "fs";
import { join } from "path";
import crypto from "crypto";
import { cacheTtlDays, cacheMaxFiles, cachePath } from "./config";

export class Cache {
  constructor(
    public user: Number,
    public type: "png" | "svg",
    public latestHistoryItem: Date,
    public minColor: String,
    public maxColor: String,
    public blankColor: String,
    public textColor: String
  ) {}
}

function getPath(hash: string, format: "png" | "svg"): string {
  return join(cachePath, `${hash}.${format}`);
}

function hashKey(cache: Cache) {
  return crypto.createHash("md5").update(JSON.stringify(cache)).digest("hex");
}

export async function get(cache: Cache) {
  const path = getPath(hashKey(cache), cache.type);

  try {
    await fs.stat(path);

    return fsClassic.createReadStream(path);
  } catch (error) {
    return undefined;
  }
}

export async function setBuffer(cache: Cache, file: Buffer) {
  try {
    await fs.writeFile(getPath(hashKey(cache), cache.type), file);
  } catch (error) {
    console.warn(error);
  }
}

export function setStream(cache: Cache) {
  return fsClassic.createWriteStream(getPath(hashKey(cache), cache.type));
}

export async function clean(): Promise<void> {
  const expiration = new Date();
  expiration.setDate(expiration.getDate() - cacheTtlDays);

  const files = await fs.readdir(cachePath);
  const filesAfterCleaning = [];

  for (const file of files) {
    const stat = await fs.stat(join(cachePath, file));

    if (stat.mtime < expiration) {
      try {
        await fs.unlink(join(cachePath, file));
      } catch (error) {
        console.log(`Ошибка удаления файла ${error.message}`);
      }
    } else {
      filesAfterCleaning.push({ file, mtime: stat.mtime });
    }
  }

  if (filesAfterCleaning.length > cacheMaxFiles) {
    filesAfterCleaning.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

    const filesForDeletion = filesAfterCleaning.splice(
      cacheMaxFiles,
      filesAfterCleaning.length - cacheMaxFiles
    );

    for (const file of filesForDeletion) {
      try {
        await fs.unlink(join(cachePath, file.file));
      } catch (error) {
        console.log(`Ошибка удаления файла ${error.message}`);
      }
    }
  }
}
