import { v4 as uuid } from "uuid";
import fs from "fs";
import { promisify } from "util";
import mongoose from "../utils/mongoose";
import { cacheExplained } from "../utils/config";

const unlink = promisify(fs.unlink);

const cache = new mongoose.Schema({
  user: Number,
  type: { type: String, enum: ["png", "svg"] },
  latest: Date,
  date: { type: Date, default: Date.now },
  file: { type: String, unique: true, default: uuid },
  color: {
    min: String,
    max: String,
    blank: String,
    text: String
  }
});

cache.statics.search = async function search(
  user: number,
  type: string,
  latest: Date,
  color: { min: string; max: string; blank: string; text: string }
): Promise<string | Promise<undefined>> {
  const result = await this.findOne({ user, type, latest, color });
  if (result) {
    return result.file;
  }
  return undefined;
};

cache.statics.clean = async function clean(): Promise<void> {
  const expiration = new Date();
  expiration.setHours(expiration.getHours() - cacheExplained);
  const result = await this.find({ date: { $lt: expiration } });
  for (const element of result) {
    await this.deleteOne(element);
    try {
      await unlink(`./cache/${element.file}.${element.type}`);
    } catch (error) {
      console.log(`Ошибка удаления файла ${error.message}`);
    }
    console.log(`rm ${element.user}`);
  }
};

interface IcacheDocument extends mongoose.Document {
  user: number;
  type: string;
  latest: Date;
  date: Date;
  file: string;
  color: {
    min: string;
    max: string;
    blank: string;
    text: string;
  };
}

interface IcacheModel extends mongoose.Model<IcacheDocument> {
  search(
    user: number,
    type: string,
    latest: Date,
    color: { min: string; max: string; blank: string; text: string }
  ): Promise<string | undefined>;
  clean(): Promise<void>;
}

const model: IcacheModel = mongoose.model<IcacheDocument, IcacheModel>(
  "cache",
  cache
);
export default model;
