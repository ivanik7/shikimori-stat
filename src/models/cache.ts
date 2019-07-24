import uuid from "uuid/v4";
import fs from "fs";
import { promisify } from "util";
import mongoose from "../utils/mongoose";
import { cacheExplained } from "../utils/config";

const unlink = promisify(fs.unlink);

const cache = new mongoose.Schema({
  user: Number,
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
  latest: Date,
  color: { min: string; max: string; blank: string; text: string }
): Promise<string | undefined> {
  const result = await this.findOne({ user, latest, color });
  if (result) {
    return result.file;
  }
  return;
};

cache.statics.save = function save(
  user: number,
  latest: Date,
  color: { min: string; max: string; blank: string; text: string }
): string {
  const req = new this({ user, latest, color });
  req.save();
  return req.file;
};

cache.statics.clean = async function clean(): Promise<void> {
  const expiration = new Date();
  expiration.setHours(expiration.getHours() - cacheExplained);
  const result = await this.find({ date: { $lt: expiration } });
  for (const element of result) {
    await unlink(`./cache/${element.file}.png`);
    await this.deleteOne(element);
    console.log(`rm ${element.user}`);
  }
};

interface IcacheDocument extends mongoose.Document {
  user: number;
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
    latest: Date,
    color: { min: string; max: string; blank: string; text: string }
  ): Promise<string | undefined>;
  save(
    user: number,
    latest: Date,
    color: { min: string; max: string; blank: string; text: string }
  ): string;
  clean(): Promise<void>;
}

const model: IcacheModel = mongoose.model<IcacheDocument, IcacheModel>(
  "cache",
  cache
);
export default model;
